import { PhotoToSave, type Repository } from '~/libs/types/types.js';
import { type AppealModel } from './appeal.model.js';
import { AppealEntity } from './appeal.entity.js';

import { type AppealQueryResponse, 
    type AppealCreateQueryPayload,
    type FileModelType } from './libs/types/types.js';
import { AppealRelation, AppealTableColumnName } from './libs/enums/enums.js';
import { String } from 'aws-sdk/clients/batch.js';
import { fileService } from '../files/files.js';

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
            
        const createdAppeal = await this.appealModel
            .query()
            .withGraphJoined(`[${AppealRelation.PHOTOS}, ${AppealRelation.CATEGORY}, ${AppealRelation.LOCATION}]`)
            .findById(appeal.id)
            .castTo<AppealQueryResponse>();

        return AppealEntity.initialize({
            id: createdAppeal.id,
            userId: createdAppeal.userId,
            categoryId: createdAppeal.category?.id ?? null,
            categoryName: createdAppeal.category?.name ?? null,
            photos: [...(createdAppeal.photos)].map(photo=>({...photo})),
            latitude: createdAppeal.location?.latitude ?? null,
            longitude: createdAppeal.location?.longitude ?? null,
            address: createdAppeal.location?.address ?? null,
            description: createdAppeal.description,
            isFinished: createdAppeal.isFinished,
            createdAt: new Date(createdAppeal.createdAt),
            updatedAt: new Date(createdAppeal.updatedAt),
        });
    }

    public async findById(id: number): Promise<AppealEntity | null> {
        const appeal = await this.appealModel
          .query()
          .withGraphJoined(`[${AppealRelation.PHOTOS}, ${AppealRelation.CATEGORY}]`)
          .findById(id)
          .castTo<AppealQueryResponse | undefined>()
          .execute();
        if (!appeal) {
          return null;
        }
    
        return AppealEntity.initialize({
            id: appeal.id,
            userId: appeal.userId,
            categoryId: appeal.category?.id ?? null,
            categoryName: appeal.category?.name ?? null,
            photos: [...(appeal.photos)].map(photo=>({...photo})),
            latitude: appeal.location?.latitude ?? null,
            longitude: appeal.location?.longitude ?? null,
            address: appeal.location?.address ?? null,
            description: appeal.description,
            isFinished: appeal.isFinished,
            createdAt: new Date(appeal.createdAt),
            updatedAt: new Date(appeal.updatedAt),
        });
    }

    public async findNotFinishedByUserId(userId: number): Promise<AppealEntity | null> {
        const appeal = await this.appealModel
          .query()
          .withGraphJoined(`[${AppealRelation.PHOTOS}, ${AppealRelation.CATEGORY}]`)
          .findOne({userId, isFinished: false})
          .castTo<AppealQueryResponse | undefined>()
          .execute();
    
        if (!appeal) {
          return null;
        }
    
        return AppealEntity.initialize({
            id: appeal.id,
            userId: appeal.userId,
            categoryId: appeal.category?.id ?? null,
            categoryName: appeal.category?.name ?? null,
            photos: [...(appeal.photos)].map(photo=>({...photo})),
            latitude: appeal.location?.latitude ?? null,
            longitude: appeal.location?.longitude ?? null,
            address: appeal.location?.address ?? null,
            description: appeal.description,
            isFinished: appeal.isFinished,
            createdAt: new Date(appeal.createdAt),
            updatedAt: new Date(appeal.updatedAt),
        });
    }

    public async findAllFinishedByUserId(userId: number): Promise<AppealEntity[] | null> {
        const appeals = await this.appealModel
          .query()
          .withGraphJoined(`[${AppealRelation.PHOTOS}, ${AppealRelation.CATEGORY}]`)
          .where({userId, isFinished: true})
          .castTo<AppealQueryResponse[] | undefined>()
          .execute();
    
        if (!appeals) {
          return null;
        }
        
        return appeals.map(appeal => AppealEntity.initialize({
            id: appeal.id,
            userId: appeal.userId,
            categoryId: appeal.category?.id ?? null,
            categoryName: appeal.category?.name ?? null,
            photos: [...(appeal.photos)].map(photo=>({...photo})),
            latitude: appeal.location?.latitude ?? null,
            longitude: appeal.location?.longitude ?? null,
            address: appeal.location?.address ?? null,
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
            .withGraphJoined(`[${AppealRelation.PHOTOS}, ${AppealRelation.CATEGORY}]`)
            .findById(appealId)
            .castTo<AppealQueryResponse>();
      
        return AppealEntity.initialize({
            id: updatedAppeal.id,
            userId: updatedAppeal.userId,
            categoryId: updatedAppeal.category?.id ?? null,
            categoryName: updatedAppeal.category?.name ?? null,
            photos: [...(updatedAppeal.photos)].map(photo=>({...photo})),
            latitude: updatedAppeal.location?.latitude ?? null,
            longitude: updatedAppeal.location?.longitude ?? null,
            address: updatedAppeal.location?.address ?? null,
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
            .withGraphJoined(`[${AppealRelation.PHOTOS}, ${AppealRelation.CATEGORY}]`)
            .findById(appealId)
            .castTo<AppealQueryResponse>();
      
        return AppealEntity.initialize({
            id: updatedAppeal.id,
            userId: updatedAppeal.userId,
            categoryId: updatedAppeal.category?.id ?? null,
            categoryName: updatedAppeal.category?.name ?? null,
            photos: [...(updatedAppeal.photos)].map(photo=>({...photo})),
            latitude: updatedAppeal.location?.latitude ?? null,
            longitude: updatedAppeal.location?.longitude ?? null,
            address: updatedAppeal.location?.address ?? null,
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
            .withGraphJoined(`[${AppealRelation.PHOTOS}, ${AppealRelation.CATEGORY}]`)
            .findById(appealId)
            .castTo<AppealQueryResponse>();
      
        return AppealEntity.initialize({
            id: updatedAppeal.id,
            userId: updatedAppeal.userId,
            categoryId: updatedAppeal.category?.id ?? null,
            categoryName: updatedAppeal.category?.name ?? null,
            photos: [...(updatedAppeal.photos)].map(photo=>({...photo})),
            latitude: updatedAppeal.location?.latitude ?? null,
            longitude: updatedAppeal.location?.longitude ?? null,
            address: updatedAppeal.location?.address ?? null,
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
            .withGraphJoined(`[${AppealRelation.PHOTOS}, ${AppealRelation.CATEGORY}]`)
            .findById(appealId)
            .castTo<AppealQueryResponse>();
      
        return AppealEntity.initialize({
            id: updatedAppeal.id,
            userId: updatedAppeal.userId,
            categoryId: updatedAppeal.category?.id ?? null,
            categoryName: updatedAppeal.category?.name ?? null,
            photos: [...(updatedAppeal.photos)].map(photo=>({...photo})),
            latitude: updatedAppeal.location?.latitude ?? null,
            longitude: updatedAppeal.location?.longitude ?? null,
            address: updatedAppeal.location?.address ?? null,
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
            .withGraphJoined(`[${AppealRelation.PHOTOS}, ${AppealRelation.CATEGORY}]`)
            .findById(appealId)
            .castTo<AppealQueryResponse>();
      
        return AppealEntity.initialize({
            id: updatedAppeal.id,
            userId: updatedAppeal.userId,
            categoryId: updatedAppeal.category?.id ?? null,
            categoryName: updatedAppeal.category?.name ?? null,
            photos: [...(updatedAppeal.photos)].map(photo=>({...photo})),
            latitude: updatedAppeal.location?.latitude ?? null,
            longitude: updatedAppeal.location?.longitude ?? null,
            address: updatedAppeal.location?.address ?? null,
            description: updatedAppeal.description,
            isFinished: updatedAppeal.isFinished,
            createdAt: new Date(updatedAppeal.createdAt),
            updatedAt: new Date(updatedAppeal.updatedAt),
        });
    }

    public async addPhotos(appealId: number, photos: PhotoToSave[]){
        const appeal = await this.appealModel
            .query()
            .findById(appealId);
        if(!appeal){
            return null;
        }
        for(const photo of photos){
            const file = await fileService.create({filePath: photo.path, 
                contentType: photo.contentType});
            await appeal
                .$relatedQuery('photos')
                .relate(file?.id as number);
            
        }
        const updatedAppeal = await this.appealModel
            .query()
            .withGraphJoined(`[${AppealRelation.PHOTOS}, ${AppealRelation.CATEGORY}]`)
            .findById(appealId)
            .castTo<AppealQueryResponse>();

        return AppealEntity.initialize({
            id: updatedAppeal.id,
            userId: updatedAppeal.userId,
            categoryId: updatedAppeal.category?.id ?? null,
            categoryName: updatedAppeal.category?.name ?? null,
            photos: [...(updatedAppeal.photos)].map(photo=>({...photo})),
            latitude: updatedAppeal.location?.latitude ?? null,
            longitude: updatedAppeal.location?.longitude ?? null,
            address: updatedAppeal.location?.address ?? null,
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
