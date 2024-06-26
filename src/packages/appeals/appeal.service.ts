import { type Service, type PhotoToSave } from "~/libs/types/types.js";
import { type AppealRepository } from "./appeal.repository.js";
import { AppealEntity } from "./appeal.entity.js";
import { fileService } from "~/packages/files/files.js";
import { ContentType } from "~/libs/enums/content-type.enum.js";
import { getTelegramFileLink } from './libs/helpers/helpers.js';
import { type AppealLocation } from './libs/types/types.js';
import { DEFAULT_ADDRESS_VALUE } from './libs/constants/constants.js';

class AppealService implements Service{
    private appealRepository: AppealRepository;

    constructor(appealRepository: AppealRepository){
        this.appealRepository = appealRepository;

        this.findById = this.findById.bind(this);
        this.create = this.create.bind(this);
        this.findAllFinishedByUserId = this.findAllFinishedByUserId.bind(this);
        this.findNotFinishedByUserId = this.findNotFinishedByUserId.bind(this);
        this.updateCategoryId = this.updateCategoryId.bind(this);
        this.updateLocation = this.updateLocation.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
        this.updateIsFinished = this.updateIsFinished.bind(this);
    }

    public async create(userId: number): 
        Promise<ReturnType<AppealEntity['toObject']> | null>{
        const item = await this.appealRepository.create(AppealEntity.initializeNew({
            userId
        }))
        
        if(!item){
            return null;
        }

        return item.toObject();
    }

    public async findById(appealId: number):        
        Promise<ReturnType<AppealEntity['toObject']> | null>{
       
        const item = await this.appealRepository.findById(appealId);

        if(!item){
            return null;
        }

        return item.toObject();
    }

    public async findAllFinishedByUserId(appealId: number):        
        Promise<ReturnType<AppealEntity['toObject']>[] | null>{

        const items = await this.appealRepository.findAllFinishedByUserId(appealId);

        if(!items || items.length === 0){
            return null;
        }

        return items.map(item=>item.toObject());
    }

    public async findNotFinishedByUserId(appealId: number):        
        Promise<ReturnType<AppealEntity['toObject']> | null>{

        const item = await this.appealRepository.findNotFinishedByUserId(appealId);

        if(!item){
            return null;
        }

        return item.toObject();
    }

    public async updateCategoryId(appealId: number, categoryId: number):
        Promise<ReturnType<AppealEntity['toObject']> | null>{
        const item = await this.findById(appealId);
        if(!item){
            return null;
        }

        const updatedAppeal = await this.appealRepository.updateCategory(appealId, categoryId);

        if(!updatedAppeal){
            return null;
        }

        return updatedAppeal.toObject();
    }

    public async updateDescription(appealId: number, description: string):
        Promise<ReturnType<AppealEntity['toObject']> | null>{
        const item = await this.findById(appealId);
        if(!item){
            return null;
        }

        const updatedAppeal = await this.appealRepository.updateDescription(appealId, description);

        if(!updatedAppeal){
            return null;
        }

        return updatedAppeal.toObject();
    }

    public async updateIsFinished(appealId: number, isFinished: boolean):
        Promise<ReturnType<AppealEntity['toObject']> | null>{
        const item = await this.findById(appealId);
        if(!item){
            return null;
        }

        const updatedAppeal = await this.appealRepository.updateIsFinished(appealId, isFinished);

        if(!updatedAppeal){
            return null;
        }

        return updatedAppeal.toObject();
    }

    public async updateLocation(appealId: number, location: AppealLocation):
        Promise<ReturnType<AppealEntity['toObject']> | null>{
        const item = await this.findById(appealId);
        if(!item){
            return null;
        }

        if(!location.address){
            location.address = DEFAULT_ADDRESS_VALUE;
        }

        if(!location.latitude || !location.longitude){
            location.latitude = null;
            location.longitude = null;
        }

        const updatedAppeal = await this.appealRepository.updateLocation(appealId, location);

        if(!updatedAppeal){
            return null;
        }

        return updatedAppeal.toObject();
    }

    public async addPhotos(appealId: number, photos: PhotoToSave[]){
        const item = await this.findById(appealId);
        if(!item){
            return null;
        }

        const appealWithPhotos = await this.appealRepository.addPhotos(appealId, photos);
        if(!appealWithPhotos){
                    return null;
                }

        return appealWithPhotos.toObject();
    }

    public async deletePhotos(appealId: number){
        const item = await this.findById(appealId);
        if(!item){
            return null;
        }

        const appealWithoutPhotos = await this.appealRepository.deletePhotos(appealId);
        if(!appealWithoutPhotos){
                    return null;
                }

        return appealWithoutPhotos.toObject();
    }

    public async getPhotosLinks(appealId: number){
        const item = await this.findById(appealId);
        if(!item){
            return null;
        }
        return item.photos?.map(photo=>{
            return getTelegramFileLink(photo.filePath);
        })
    }

    public async getPhotosFilePaths(appealId: number){
        const item = await this.findById(appealId);
        if(!item){
            return null;
        }
        return item.photos?.map(photo=>{
            return photo.filePath
        })
    }


    public findAll(): Promise<{ items: [] }> {
        return Promise.resolve({ items: [] });
      }

    public update(): ReturnType<Service['update']> {
        return Promise.resolve(null);
      }
    
    public async delete(id: number): ReturnType<Service['delete']> {
        return await this.appealRepository.delete(id) === 0 ? true : false;
    }

}

export { AppealService };