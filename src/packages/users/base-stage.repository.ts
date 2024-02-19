import { type Repository } from "~/libs/types/types.js";
import { RegistrationStageModel } from "./registration-stage.model.js";
import { MAX_ORDER_COLUMN_NAME,
        MIN_ORDER_COLUMN_NAME 
    } from './libs/constants/constants.js';
import { StageEntity } from "./stage.entity.js";
import { type StageQueryResponse,
type StageWithMaxOrderNumberQueryResponse,
type StageWithMinOrderNumberQueryResponse } from './libs/types/types.js';
import { StageTableColumnName } from "./libs/enums/stage-table-column-name.enum.js";
import { CreatingAppealStageModel } from "./creating-appeal-stage.model.js";

type StageModel = typeof RegistrationStageModel | typeof CreatingAppealStageModel

class BaseStageRepository implements Repository{
    private stageModel: StageModel;

    constructor(stageModel: StageModel){
        this.stageModel = stageModel;
    }

    public async findById(id: number): Promise<StageEntity | null>{
        const stage = await this.stageModel
            .query()
            .findById(id)
            .castTo<StageQueryResponse | undefined>();

        if(!stage){
            return null;
        }

        return StageEntity.initialize({
            id: stage.id,
            createdAt: new Date(stage.createdAt),
            updatedAt:  new Date(stage.updatedAt),
            name: stage.name,
            orderNumber: stage.orderNumber
        })
    }

    public async findByOrderNumber(orderNumber: number): Promise<StageEntity | null>{
        const stage = await this.stageModel
            .query()
            .findOne({orderNumber})
            .castTo<StageQueryResponse | undefined>();

        if(!stage){
            return null;
        }

        return StageEntity.initialize({
            id: stage.id,
            createdAt: new Date(stage.createdAt),
            updatedAt:  new Date(stage.updatedAt),
            name: stage.name,
            orderNumber: stage.orderNumber
        })
    }
        
    public async getLastOrderNumber(): Promise<number>{
        const result = await this.stageModel
                .query()
                .max(`${StageTableColumnName.ORDER_NUMBER}
                    as ${MAX_ORDER_COLUMN_NAME}`)
                .first()
                .castTo<StageWithMaxOrderNumberQueryResponse>();
        return result[MAX_ORDER_COLUMN_NAME];
    }

    public async getFirstOrderNumber(): Promise<number>{
        const result = await this.stageModel
                .query()
                .min(`${StageTableColumnName.ORDER_NUMBER}
                    as ${MIN_ORDER_COLUMN_NAME}`)
                .first()
                .castTo<StageWithMinOrderNumberQueryResponse>();
        return result[MIN_ORDER_COLUMN_NAME];
    }

    public async getNext(id: number): Promise<StageEntity | null>{
        const currentStage = (await this.findById(id))?.toObject();
        const lastOrderNumber = await this.getLastOrderNumber();
        if(!currentStage){
            return null;
        }
        return await this.findByOrderNumber(Math.min(
            currentStage.orderNumber + 1, lastOrderNumber));
    }

    public async getPrevious(id: number): Promise<StageEntity | null>{
        const currentStage = (await this.findById(id))?.toObject();
        const firstOrderNumber = await this.getFirstOrderNumber();
        if(!currentStage){
            return null;
        }
        return await this.findByOrderNumber(Math.max(
            currentStage.orderNumber - 1, firstOrderNumber));
    }

    public async create(entity: StageEntity): Promise<StageEntity>{
        const { name, orderNumber } = entity.toNewObject();

        if(orderNumber && orderNumber <= 0){
            throw Error('orderNumber field must be a positive number.');
        }

        const maxOrderNumber = await this.getLastOrderNumber();
        const orderNumberToCreate = orderNumber ?
            Math.min(orderNumber, maxOrderNumber + 1) : maxOrderNumber + 1
        
        const stage = await this.stageModel
            .query()
            .insert({
                name,
                orderNumber: orderNumberToCreate
            })
            .castTo<StageQueryResponse>();
            
        await this.stageModel
            .query()
            .where(StageTableColumnName.ORDER_NUMBER,
                '>=', orderNumberToCreate)
            .increment(StageTableColumnName.ORDER_NUMBER, 1)
            
     
        return StageEntity.initialize({
            id: stage.id,
            createdAt: new Date(stage.createdAt),
            updatedAt:  new Date(stage.updatedAt),
            name: stage.name,
            orderNumber: stage.orderNumber
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

export { BaseStageRepository };