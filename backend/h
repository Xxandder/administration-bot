[1mdiff --git a/src/packages/appeals/appeal.repository.ts b/src/packages/appeals/appeal.repository.ts[m
[1mindex dc2476a..b3941e6 100644[m
[1m--- a/src/packages/appeals/appeal.repository.ts[m
[1m+++ b/src/packages/appeals/appeal.repository.ts[m
[36m@@ -1,5 +1,9 @@[m
 import { type Repository } from '~/libs/types/types.js';[m
 import { type AppealModel } from './appeal.model.js';[m
[32m+[m[32mimport { AppealEntity } from './appeal.entity.js';[m
[32m+[m
[32m+[m[32mimport { type AppealQueryResponse } from './libs/types/types.js';[m
[32m+[m[32mimport { AppealRelation } from './libs/enums/enums.js';[m
 [m
 class AppealRepository implements Repository{[m
     private appealModel: typeof AppealModel;[m
[36m@@ -7,6 +11,87 @@[m [mclass AppealRepository implements Repository{[m
     public constructor(appealModel : typeof AppealModel){[m
         this.appealModel = appealModel[m
     }[m
[32m+[m
[32m+[m[32m    public async findById(id: number): Promise<AppealEntity | null> {[m
[32m+[m[32m        const appeal = await this.appealModel[m
[32m+[m[32m          .query()[m
[32m+[m[32m          .withGraphJoined(`${AppealRelation.CATEGORY}`)[m
[32m+[m[32m          .findById(id)[m
[32m+[m[32m          .castTo<AppealQueryResponse | undefined>()[m
[32m+[m[32m          .execute();[m
[32m+[m[41m    [m
[32m+[m[32m        if (!appeal) {[m
[32m+[m[32m          return null;[m
[32m+[m[32m        }[m
[32m+[m[41m    [m
[32m+[m[32m        return AppealEntity.initialize({[m
[32m+[m[32m            id: appeal.id,[m
[32m+[m[32m            userId: appeal.userId,[m
[32m+[m[32m            categoryId: appeal.category.id,[m
[32m+[m[32m            latitude: appeal.latitude,[m
[32m+[m[32m            longitude: appeal.longitude,[m
[32m+[m[32m            description: appeal.description,[m
[32m+[m[32m            isFinished: appeal.isFinished,[m
[32m+[m[32m            createdAt: new Date(appeal.createdAt),[m
[32m+[m[32m            updatedAt: new Date(appeal.updatedAt),[m
[32m+[m[32m        });[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    public async findNotFinishedByUserId(userId: number): Promise<AppealEntity | null> {[m
[32m+[m[32m        const appeal = await this.appealModel[m
[32m+[m[32m          .query()[m
[32m+[m[32m          .withGraphJoined(`${AppealRelation.CATEGORY}`)[m
[32m+[m[32m          .findOne({userId})[m
[32m+[m[32m          .castTo<AppealQueryResponse | undefined>()[m
[32m+[m[32m          .execute();[m
[32m+[m[41m    [m
[32m+[m[32m        if (!appeal) {[m
[32m+[m[32m          return null;[m
[32m+[m[32m        }[m
[32m+[m[41m    [m
[32m+[m[32m        return AppealEntity.initialize({[m
[32m+[m[32m            id: appeal.id,[m
[32m+[m[32m            userId: appeal.userId,[m
[32m+[m[32m            categoryId: appeal.category.id,[m
[32m+[m[32m            latitude: appeal.latitude,[m
[32m+[m[32m            longitude: appeal.longitude,[m
[32m+[m[32m            description: appeal.description,[m
[32m+[m[32m            isFinished: appeal.isFinished,[m
[32m+[m[32m            createdAt: new Date(appeal.createdAt),[m
[32m+[m[32m            updatedAt: new Date(appeal.updatedAt),[m
[32m+[m[32m        });[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    public async findAllByUserId(userId: number): Promise<AppealEntity[] | null> {[m
[32m+[m[32m        const appeals = await this.appealModel[m
[32m+[m[32m          .query()[m
[32m+[m[32m          .withGraphJoined(`${AppealRelation.CATEGORY}`)[m
[32m+[m[32m          .findOne({userId})[m
[32m+[m[32m          .castTo<AppealQueryResponse[] | undefined>()[m
[32m+[m[32m          .execute();[m
[32m+[m[41m    [m
[32m+[m[32m        if (!appeals) {[m
[32m+[m[32m          return null;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        return appeals.map(appeal => AppealEntity.initialize({[m
[32m+[m[32m            id: appeal.id,[m
[32m+[m[32m            userId: appeal.userId,[m
[32m+[m[32m            categoryId: appeal.category.id,[m
[32m+[m[32m            latitude: appeal.latitude,[m
[32m+[m[32m            longitude: appeal.longitude,[m
[32m+[m[32m            description: appeal.description,[m
[32m+[m[32m            isFinished: appeal.isFinished,[m
[32m+[m[32m            createdAt: new Date(appeal.createdAt),[m
[32m+[m[32m            updatedAt: new Date(appeal.updatedAt),[m
[32m+[m[32m        }));[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    public delete(id: number): ReturnType<Repository['delete']> {[m
[32m+[m[32m        return this.appealModel.query().deleteById(id).execute();[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m
 }[m
 [m
 export { AppealRepository };[m
