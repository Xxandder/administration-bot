import { type Service } from "~/libs/types/types.js";
import { type AppealRepository } from "./appeal.repository.js";
import { AppealEntity } from "./appeal.entity.js";

class AppealService implements Service{
    private appealRepository: AppealRepository;

    constructor(appealRepository: AppealRepository){
        this.appealRepository = appealRepository;
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

    public async updateLatitude(appealId: number, latitude: number):
        Promise<ReturnType<AppealEntity['toObject']> | null>{
        const item = await this.findById(appealId);
        if(!item){
            return null;
        }

        const updatedAppeal = await this.appealRepository.updateLatitude(appealId, latitude);

        if(!updatedAppeal){
            return null;
        }

        return updatedAppeal.toObject();
    }

    public async updateLongitude(appealId: number, longitude: number):
        Promise<ReturnType<AppealEntity['toObject']> | null>{
        const item = await this.findById(appealId);
        if(!item){
            return null;
        }

        const updatedAppeal = await this.appealRepository.updateLongitude(appealId, longitude);

        if(!updatedAppeal){
            return null;
        }

        return updatedAppeal.toObject();
    }

}

export { AppealService };