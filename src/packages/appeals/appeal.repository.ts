import { type Repository } from '~/libs/types/types.js';
import { type AppealModel } from './appeal.model.js';
import { AppealEntity } from './appeal.entity.js';

import { type AppealQueryResponse, 
    type AppealCreateQueryPayload } from './libs/types/types.js';
import { AppealRelation } from './libs/enums/enums.js';

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
          .findOne({userId})
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

    public async findAllByUserId(userId: number): Promise<AppealEntity[] | null> {
        const appeals = await this.appealModel
          .query()
          .withGraphJoined(`${AppealRelation.CATEGORY}`)
          .findOne({userId})
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

    public delete(id: number): ReturnType<Repository['delete']> {
        return this.appealModel.query().deleteById(id).execute();
    }


}

export { AppealRepository };
