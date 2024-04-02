import TelegramBot, { InlineKeyboardMarkup, InputMediaPhoto, ReplyKeyboardMarkup } from "node-telegram-bot-api";
import dotenv from 'dotenv';
import { userService } from "~/packages/users/user.js";
import { CallbackDataCommands, InlineCommands, RegistrationStage, CommonStage, CreatingAppealStage, CreatingAppealStageMessage, RegistrationTextMessage, CommonTextMessages } from "./libs/enums/enums.js";
import { CreatingAppealStageValues, type CommonKeyboard, type InlineKeyboard, type RegistrationStageValues } from "./libs/types/types.js";
import { getActualRegistrationMessageObject, getActualCommonMessageObject, getAppealConfirmationMessage } from './libs/helpers/helpers.js';
import { descriptionSchema, fullNameSchema } from './libs/validation-schemas/validation-schemas.js';
import { ReturnBack, ConfirmPersonalData, ConfirmPhotos } from './libs/keyboards/keyboards.js';
import { getActualCreatingAppealMessageObject } from "./libs/helpers/get-actual-creating-appeal-message.helper.js";
import { appealService } from "~/packages/appeals/appeals.js";
import { Categories, MAX_NUMBER_OF_PHOTOS } from "./libs/constants/constants.js";
import { ContentType } from "~/libs/enums/content-type.enum.js";
import { CallbackHandler } from "./callback-handler.js";
import { MessageHandler } from './message-handler.js';

dotenv.config();

const isUserSendingPhotos: Record<string, boolean> = {};
const queue: Record<string, TelegramBot.Message[]> = {}; 

class TelegramBotService {
    private bot: TelegramBot;
    private callbackHandler: CallbackHandler;
    private messageHandler: MessageHandler;

    public constructor(){
        this.checkIsMessageHasOnlyText = this.checkIsMessageHasOnlyText.bind(this);
        this.processMessage = this.processMessage.bind(this);
        this.handleUserRegistration = this.handleUserRegistration.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.sendActualMessage = this.sendActualMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

        this.callbackHandler = new CallbackHandler(this);
        this.messageHandler = new MessageHandler(this);

        this.bot = new TelegramBot(process.env?.['TG_BOT_TOKEN'] ?? '', {polling:true});

        this.bot.on('message', async (message)=>{
            console.log('message')
            const chatId = message.chat.id.toString();
            if (!queue[chatId]) {
                queue[chatId] = [];
            
                
            }
            queue[chatId]?.push(message);
    
            if (queue[chatId]?.length === 1) {
                await this.processMessage(message);
            }
        });
        this.bot.on('callback_query', async (query)=>{
            await this.bot.editMessageReplyMarkup({ inline_keyboard: [] }, {
                chat_id: query.message?.chat.id as number,
                message_id: query.message?.message_id as number
            });
            await this.callbackHandler.handleCallbackQuery(query);
    
        })
    }

    private async processMessage(message: TelegramBot.Message) {
        const chatId = message.chat.id.toString();

        // try{
        //     user = await userService.findByChatId(chatId);

        //     if(user && !user.isRegistered){
        //         await this.handleUserRegistration(message);
        //     }
        //     else if(user && user.isCreatingAppeal){
        //         await this.handleCreatingAppeal(message)
        //     }
        //     else{
        //         await this.sendActualMessage(chatId);
        //     }
        // }catch(e){
        //     if(message.text &&
        //          message.text === InlineCommands.START && 
        //          this.checkIsMessageHasOnlyText(message)){
        //         await this.handleStart(chatId);
        //     }
        //     else{
               
                
        //     }
        // }
        this.messageHandler.handleMessage(message);

        if(chatId in queue){
            const messages = queue[chatId as string];
            queue[chatId as string]?.shift();
            if (messages && messages.length > 0) {
                await this.processMessage(messages[0] as TelegramBot.Message);
            }
        }
        
    }

    private async handleCreatingAppeal(message: TelegramBot.Message){
    
        const chatId = message.chat.id.toString();
        try{
            const user = await userService.findByChatId(chatId);
            const currentAppeal = await appealService.findNotFinishedByUserId(user?.id as number);
            if(!user){
                return null;
            }
            const creatingAppealStage = await userService.getCreatingAppealStageByUserId(user.id as number);
            switch(creatingAppealStage?.name){
                case CreatingAppealStage.ENTER_DESCRIPTION:
                    if(this.checkIsMessageHasOnlyText(message)){
                        const { error, value } = descriptionSchema.validate(message.text);
                        if(error){
                            await this.sendMessage(chatId, 
                                error.details[0]?.message as string, 
                                ReturnBack);
                        }else{
                            await appealService.updateDescription(currentAppeal?.id as number, value)
                            await userService.moveToNextCreatingAppealStage(user.id);
                            await this.sendActualMessage(chatId); 
                        }
                    }else{
                          
                    }
                case CreatingAppealStage.SEND_PHOTOS:
                    if(message.photo){
                            isUserSendingPhotos[chatId] = true;
                            for(let index = 3; index < message.photo.length; index += 4){
                                await appealService.addPhotos(currentAppeal?.id as number, [{
                                    path: message.photo[index]?.file_id as string,
                                    contentType: ContentType.JPEG
                                }]
                                )}
                            }
                            const currentPhotos = await appealService.getPhotosLinks(currentAppeal?.id as number);
                            const currentNumberOfPhotos = currentPhotos ? currentPhotos.length : 0;
                            if(currentNumberOfPhotos >= MAX_NUMBER_OF_PHOTOS){
                                isUserSendingPhotos[chatId] = false;
                                await userService.moveToNextCreatingAppealStage(user.id);
                                await this.sendActualMessage(chatId);
                            }
                        break;
                        case CreatingAppealStage.SEND_GEO:
                            if(message.venue){
                                const longitude = message.venue?.location.longitude;
                                const latitude = message.venue?.location.latitude;
                                const address = message.venue?.address;
                              
                                const location = await appealService.updateLocation(currentAppeal?.id as number,
                                        {longitude, latitude, address} );
                               
                                        await userService.moveToNextCreatingAppealStage(user.id);
                                        await this.sendAppeal(chatId, currentAppeal?.id as number);
                                
                            }
                            if(message.location){
                                const longitude = message.location.longitude
                                const latitude = message.location.latitude;
                             
                                const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ru&key=${process.env['GOOLGE_COORDINATES_API_KEY']}`;
                                await fetch(url)
                                .then(async response => {
                                    if (!response.ok) {
                                        await appealService.updateLocation(currentAppeal?.id as number,
                                            {longitude, latitude, address: 'Точка на мапі'} );
                                    }
                                    return response.json();
                                    })
                                    .then(async data => {
                                        await appealService.updateLocation(currentAppeal?.id as number,
                                            {longitude, latitude, address: data.results[0].formatted_address} );
                                    })
                                    .catch(async error => {
                                        await appealService.updateLocation(currentAppeal?.id as number,
                                            {longitude, latitude, address: 'Точка на мапі'} );
                                    });
                                await userService.moveToNextCreatingAppealStage(user.id);
                               await this.sendAppeal(chatId, currentAppeal?.id as number);
                            }
                            break;
                        case CreatingAppealStage.CONFIRMATION:
                            
                            break;
                        default:
                            await this.sendActualMessage(chatId)
                            break;         
            }
        
        }
            
        catch(e){
            console.log(e)
            await this.sendActualMessage(chatId);
        }
        
    }   

    private async handleUserRegistration(message: TelegramBot.Message){
        const chatId = message.chat.id.toString();
        try{
            const user = await userService.findByChatId(chatId);
            if(!user){
                return null;
            }
            const registrationStage = await userService.getRegistrationStageByUserId(user.id as number);
            switch (registrationStage?.name){
                case RegistrationStage.SENDING_PHONE_NUMBER:
                    if(message.contact &&
                        message.contact.user_id === parseInt(chatId)){
                            await userService.updateDetails({
                                id: user.id as number,
                                details: {
                                    phoneNumber: message.contact.phone_number,
                                    fullName: null
                                }
                            })
                            await userService.moveToNextRegistrationStage(user.id);
                            
                            await this.sendActualMessage(chatId);
                    }else{
                        await this.sendActualMessage(chatId);
                    }
                    break;
                case RegistrationStage.TYPING_FULL_NAME:
                    if(this.checkIsMessageHasOnlyText(message)){
                        const { error, value } = fullNameSchema.validate(message.text);
                        if(error){
                            await this.sendMessage(chatId, 
                                error.details[0]?.message as string, 
                                ReturnBack);
                        }else{
                            await userService.updateDetails({
                                id: user.id as number,
                                details: {
                                    phoneNumber: null,
                                    fullName: message.text as string
                                }
                            })
                            await userService.moveToNextRegistrationStage(user.id);
                            await this.sendActualMessage(chatId);
                        }
                      
                    }else{
                        await this.sendActualMessage(chatId);
                    }
                    break;
                default:
                    await this.sendActualMessage(chatId)
                    break;
            }
        }catch(e){
            throw e;
        }
    }

    public async handleStart(chatId: string){
        const user = await userService.create(chatId);
        await this.sendMessage(chatId, RegistrationTextMessage.GREETING_TEXT);
        await this.sendActualMessage(chatId);
    }
    
    public async sendAppeal(chatId: string, appealId: number){
        const photoIds = await appealService.getPhotosFilePaths(appealId);

        const appeal = await appealService.findById(appealId);
        const confirmationText = getAppealConfirmationMessage({
            category: appeal?.categoryName as (typeof Categories[number]),
             description: appeal?.description as string})
        await this.sendMessage(chatId, confirmationText);
        if(photoIds && photoIds.length >= 1){
            const options: InputMediaPhoto[] = photoIds.map(photoId=>{
                return { type: 'photo', media: photoId }
            })
            await this.bot.sendMediaGroup(chatId, options)
        }
        await this.sendMessage(chatId, appeal?.address ?? 'Точка на мапі');
        await this.sendActualMessage(chatId);
    }

    public  async sendActualMessage(chatId: string){
        
        try{
            const user = await userService.findByChatId(chatId);
            if(!user?.isRegistered){
                const registrationStage = await userService.getRegistrationStageByUserId(user?.id as number);
                const messageObject = await getActualRegistrationMessageObject(chatId, registrationStage?.name as RegistrationStageValues);
                
                return await this.sendMessage(chatId, messageObject.text, messageObject.options?.reply_markup)
            }
            else if(user.isCreatingAppeal){
                
                const creatingAppealStage = await userService.getCreatingAppealStageByUserId(user?.id as number);
                const messageObject = await getActualCreatingAppealMessageObject(chatId, creatingAppealStage?.name as CreatingAppealStageValues);

                return await this.sendMessage(chatId, messageObject.text, messageObject.options?.reply_markup)
            }
            else{
                const messageObject = await getActualCommonMessageObject(CommonStage.MAIN_MENU);
                return await this.sendMessage(chatId, messageObject.text, messageObject.options?.reply_markup)
            }
            
        }catch(e){
            throw e;
        }
    }

    public async sendMessage(chatId: string, text: string, keyboard?: ReplyKeyboardMarkup  | InlineKeyboardMarkup  ) {
        const messageOptions: TelegramBot.SendMessageOptions = {
            reply_markup: keyboard,
            parse_mode: 'Markdown'
        };
        return await this.bot.sendMessage(parseInt(chatId), text, messageOptions);
    }

    public checkIsMessageHasOnlyText(message: TelegramBot.Message){
        const text = message.text;
        return text && !message.photo &&
            !message.audio && 
            !message.document && 
            !message.sticker && 
            !message.video && 
            !message.voice && 
            !message.video_note && 
            !message.contact && 
            !message.location && 
            !message.venue && 
            !message.new_chat_members && 
            !message.left_chat_member && 
            !message.new_chat_title && 
            !message.new_chat_photo && 
            !message.delete_chat_photo && 
            !message.group_chat_created && 
            !message.supergroup_chat_created && 
            !message.channel_chat_created && 
            !message.migrate_to_chat_id && 
            !message.migrate_from_chat_id && 
            !message.pinned_message && 
            !message.invoice && 
            !message.successful_payment
    }

}

export { TelegramBotService }