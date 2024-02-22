import { type Repository } from '~/libs/types/types.js';
import { type AppealModel } from './appeal.model.js';
import { AppealEntity } from './appeal.entity.js';

import { type AppealQueryResponse, 
    type AppealCreateQueryPayload } from './libs/types/types.js';
import { AppealRelation, AppealTableColumnName } from './libs/enums/enums.js';
import { String } from 'aws-sdk/clients/batch.js';

class AppealRepository implements Repository{
    private appealModel: typeof AppealModel;

    public constructor(appealModel : typeof AppealModel){
        this.appealModel = appealModel
    }

     public async create(entity: AppealEntity): Promise<AppealEntity | null> {
        const { userId } = entity.toNewObject();
        const appeal = await this.appealModel
            .query()
            .insertGraph({
                userId
            } as AppealCreateQueryPayload)
            .castTo<AppealQueryResponse>();

        return AppealEntity.initialize({
            id: appeal.id,
            userId: appeal.userId,
            categoryId: appeal.category.id,
            latitude: appeal.latitude,
            longitude: appeal.longitude,
            description: appeal.description,
            isFinished: appeal.isFinished,
            createdAt: new Date(appeal.createdAt),
            updatedAt: new Date(appeal.updatedAt),
        });
    }

    public async findById(id: number): Promise<AppealEntity | null> {
        const appeal = await this.appealModel
          .query()
          .withGraphJoined(`${AppealRelation.CATEGORY}`)
          .findById(id)
          .castTo<AppealQueryResponse | undefined>()
          .execute();
    
        if (!appeal) {
          return null;
        }
    
        return AppealEntity.initialize({
            id: appeal.id,
            userId: appeal.userId,
            categoryId: appeal.category.id,
            latitude: appeal.latitude,
            longitude: appeal.longitude,
            description: appeal.description,
            isFinished: appeal.isFinished,
            createdAt: new Date(appeal.createdAt),
            updatedAt: new Date(appeal.updatedAt),
        });
    }

    public async findNotFinishedByUserId(userId: number): Promise<AppealEntity | null> {
        const appeal = await this.appealModel
          .query()
          .withGraphJoined(`${AppealRelation.CATEGORY}`)
          .findOne({userId, isFinished: false})
          .castTo<AppealQueryResponse | undefined>()
          .execute();
    
        if (!appeal) {
          return null;
        }
    
        return AppealEntity.initialize({
            id: appeal.id,
            userId: appeal.userId,
            categoryId: appeal.category.id,
            latitude: appeal.latitude,
            longitude: appeal.longitude,
            description: appeal.description,
            isFinished: appeal.isFinished,
            createdAt: new Date(appeal.createdAt),
            updatedAt: new Date(appeal.updatedAt),
        });
    }

    public async findAllFinishedByUserId(userId: number): Promise<AppealEntity[] | null> {
        const appeals = await this.appealModel
          .query()
          .withGraphJoined(`${AppealRelation.CATEGORY}`)
          .findOne({userId, isFinished: true})
          .castTo<AppealQueryResponse[] | undefined>()
          .execute();
    
        if (!appeals) {
          return null;
        }
        
        return appeals.map(appeal => AppealEntity.initialize({
            id: appeal.id,
            userId: appeal.userId,
            categoryId: appeal.category.id,
            latitude: appeal.latitude,
            longitude: appeal.longitude,
            description: appeal.description,
            isFinished: appeal.isFinished,
            createdAt: new Date(appeal.createdAt),
            updatedAt: new Date(appeal.updatedAt),
        }));
    }

    public async updateCategory(appealId: number, categoryId: number):
    Promise<AppealEntity | null>{
        const appeal = (await this.findById(appealId));
        if(!appeal){
            return null;
        }

        await this.appealModel
            .query()
            .patch({categoryId})
            .where({id: appealId})

        const updatedAppeal = await this.appealModel
            .query()
            .withGraphJoined(`${AppealRelation.CATEGORY}`)
            .findById(appealId)
            .castTo<AppealQueryResponse>();
      
        return AppealEntity.initialize({
            id: updatedAppeal.id,
            userId: updatedAppeal.userId,
            categoryId: updatedAppeal.category.id,
            latitude: updatedAppeal.latitude,
            longitude: updatedAppeal.longitude,
            description: updatedAppeal.description,
            isFinished: updatedAppeal.isFinished,
            createdAt: new Date(updatedAppeal.createdAt),
            updatedAt: new Date(updatedAppeal.updatedAt),
        });
    }

    public async updateLongitude(appealId: number, longitude: number):
    Promise<AppealEntity | null>{
        const appeal = (await this.findById(appealId));
        if(!appeal){
            return null;
        }

        await this.appealModel
            .query()
            .patch({longitude})
            .where({id: appealId})

        const updatedAppeal = await this.appealModel
            .query()
            .withGraphJoined(`${AppealRelation.CATEGORY}`)
            .findById(appealId)
            .castTo<AppealQueryResponse>();
      
        return AppealEntity.initialize({
            id: updatedAppeal.id,
            userId: updatedAppeal.userId,
            categoryId: updatedAppeal.category.id,
            latitude: updatedAppeal.latitude,
            longitude: updatedAppeal.longitude,
            description: updatedAppeal.description,
            isFinished: updatedAppeal.isFinished,
            createdAt: new Date(updatedAppeal.createdAt),
            updatedAt: new Date(updatedAppeal.updatedAt),
        });
    }

    public async updateLatitude(appealId: number, latitude: number):
    Promise<AppealEntity | null>{
        const appeal = (await this.findById(appealId));
        if(!appeal){
            return null;
        }

        await this.appealModel
            .query()
            .patch({latitude})
            .where({id: appealId})

        const updatedAppeal = await this.appealModel
            .query()
            .withGraphJoined(`${AppealRelation.CATEGORY}`)
            .findById(appealId)
            .castTo<AppealQueryResponse>();
      
        return AppealEntity.initialize({
            id: updatedAppeal.id,
            userId: updatedAppeal.userId,
            categoryId: updatedAppeal.category.id,
            latitude: updatedAppeal.latitude,
            longitude: updatedAppeal.longitude,
            description: updatedAppeal.description,
            isFinished: updatedAppeal.isFinished,
            createdAt: new Date(updatedAppeal.createdAt),
            updatedAt: new Date(updatedAppeal.updatedAt),
        });
    }

    public async updateDescription(appealId: number, description: string):
    Promise<AppealEntity | null>{
        const appeal = (await this.findById(appealId));
        if(!appeal){
            return null;
        }

        await this.appealModel
            .query()
            .patch({description})
            .where({id: appealId})

        const updatedAppeal = await this.appealModel
            .query()
            .withGraphJoined(`${AppealRelation.CATEGORY}`)
            .findById(appealId)
            .castTo<AppealQueryResponse>();
      
        return AppealEntity.initialize({
            id: updatedAppeal.id,
            userId: updatedAppeal.userId,
            categoryId: updatedAppeal.category.id,
            latitude: updatedAppeal.latitude,
            longitude: updatedAppeal.longitude,
            description: updatedAppeal.description,
            isFinished: updatedAppeal.isFinished,
            createdAt: new Date(updatedAppeal.createdAt),
            updatedAt: new Date(updatedAppeal.updatedAt),
        });
    }

    public async updateIsFinished(appealId: number, isFinished: boolean):
    Promise<AppealEntity | null>{
        const appeal = (await this.findById(appealId));
        if(!appeal){
            return null;
        }

        await this.appealModel
            .query()
            .patch({isFinished})
            .where({id: appealId})

        const updatedAppeal = await this.appealModel
            .query()
            .withGraphJoined(`${AppealRelation.CATEGORY}`)
            .findById(appealId)
            .castTo<AppealQueryResponse>();
      
        return AppealEntity.initialize({
            id: updatedAppeal.id,
            userId: updatedAppeal.userId,
            categoryId: updatedAppeal.category.id,
            latitude: updatedAppeal.latitude,
            longitude: updatedAppeal.longitude,
            description: updatedAppeal.description,
            isFinished: updatedAppeal.isFinished,
            createdAt: new Date(updatedAppeal.createdAt),
            updatedAt: new Date(updatedAppeal.updatedAt),
        });
    }

    public delete(id: number): ReturnType<Repository['delete']> {
        return this.appealModel.query().deleteById(id).execute();
    }

    public async findAll(): ReturnType<Repository['findAll']> {
        return await Promise.resolve([]);
    }

    public update(): ReturnType<Repository['update']> {
        return Promise.resolve(null);
    }

}

export { AppealRepository };
