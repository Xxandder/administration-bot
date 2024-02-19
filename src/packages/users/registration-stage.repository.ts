import { type Repository } from "~/libs/types/types.js";
import { RegistrationStageModel } from "./registration-stage.model.js";
import { DEFAULT_REGISTRATION_STAGE_ORDER_NUMBER,
MAX_ORDER_COLUMN_NAME,
MIN_ORDER_COLUMN_NAME } from './libs/constants/constants.js';
import { StageEntity } from "./stage.entity.js";
import { type StageQueryResponse,
type StageWithMaxOrderNumberQueryResponse,
type StageWithMinOrderNumberQueryResponse } from './libs/types/types.js';
import { RegistrationStageTableColumnName } from "./libs/enums/registration-stage-table-column-name.enum.js";

class RegistrationStageRepository implements Repository{
    private registrationStageModel: typeof RegistrationStageModel;

    constructor(registrationStageModel: typeof RegistrationStageModel){
        this.registrationStageModel = registrationStageModel;
    }

    public async findById(id: number): Promise<StageEntity | null>{
        const registrationStage = await this.registrationStageModel
            .query()
            .findById(id)
            .castTo<StageQueryResponse | undefined>();

        if(!registrationStage){
            return null;
        }

        return StageEntity.initialize({
            id: registrationStage.id,
            createdAt: new Date(registrationStage.createdAt),
            updatedAt:  new Date(registrationStage.updatedAt),
            name: registrationStage.name,
            orderNumber: registrationStage.orderNumber
        })
    }

    public async findByOrderNumber(orderNumber: number): Promise<StageEntity | null>{
        const registrationStage = await this.registrationStageModel
            .query()
            .findOne({orderNumber})
            .castTo<StageQueryResponse | undefined>();

        if(!registrationStage){
            return null;
        }

        return StageEntity.initialize({
            id: registrationStage.id,
            createdAt: new Date(registrationStage.createdAt),
            updatedAt:  new Date(registrationStage.updatedAt),
            name: registrationStage.name,
            orderNumber: registrationStage.orderNumber
        })
    }
        
    public async getLastOrderNumber(): Promise<number>{
        const result = await this.registrationStageModel
                .query()
                .max(`${RegistrationStageTableColumnName.ORDER_NUMBER}
                    as ${MAX_ORDER_COLUMN_NAME}`)
                .first()
                .castTo<StageWithMaxOrderNumberQueryResponse>();
        return result[MAX_ORDER_COLUMN_NAME];
    }

    public async getFirstOrderNumber(): Promise<number>{
        const result = await this.registrationStageModel
                .query()
                .min(`${RegistrationStageTableColumnName.ORDER_NUMBER}
                    as ${MIN_ORDER_COLUMN_NAME}`)
                .first()
                .castTo<StageWithMinOrderNumberQueryResponse>();
        return result[MIN_ORDER_COLUMN_NAME];
    }

    public async getNext(id: number): Promise<StageEntity | null>{
        const currentRegistrationStage = (await this.findById(id))?.toObject();
        const lastOrderNumber = await this.getLastOrderNumber();
        if(!currentRegistrationStage){
            return null;
        }
        return await this.findByOrderNumber(Math.min(
            currentRegistrationStage.orderNumber + 1, lastOrderNumber));
    }

    public async getPrevious(id: number): Promise<StageEntity | null>{
        const currentRegistrationStage = (await this.findById(id))?.toObject();
        const firstOrderNumber = await this.getFirstOrderNumber();
        if(!currentRegistrationStage){
            return null;
        }
        return await this.findByOrderNumber(Math.max(
            currentRegistrationStage.orderNumber - 1, firstOrderNumber));
    }

    public async create(entity: StageEntity): Promise<StageEntity>{
        const { name, orderNumber } = entity.toNewObject();

        if(orderNumber && orderNumber <= 0){
            throw Error('orderNumber field must be a positive number.');
        }

        const maxOrderNumber = await this.getLastOrderNumber();
        const orderNumberToCreate = orderNumber ?
            Math.min(orderNumber, maxOrderNumber + 1) : maxOrderNumber + 1
        
        const registrationStage = await this.registrationStageModel
            .query()
            .insert({
                name,
                orderNumber: orderNumberToCreate
            })
            .castTo<StageQueryResponse>();
            
        await this.registrationStageModel
            .query()
            .where(RegistrationStageTableColumnName.ORDER_NUMBER,
                '>=', orderNumberToCreate)
            .increment(RegistrationStageTableColumnName.ORDER_NUMBER, 1)
            
     
        return StageEntity.initialize({
            id: registrationStage.id,
            createdAt: new Date(registrationStage.createdAt),
            updatedAt:  new Date(registrationStage.updatedAt),
            name: registrationStage.name,
            orderNumber: registrationStage.orderNumber
        })

    }



    public update(): ReturnType<Repository['update']> {
        return Promise.resolve(null);
      }

      public findAll(): ReturnType<Repository['findAll']> {
        return Promise.resolve([]);
      }

    public delete(): ReturnType<Repository['delete']> {
        const DELETED_COUNT = 0;
    
        return Promise.resolve(DELETED_COUNT);
    }

}

export { RegistrationStageRepository };