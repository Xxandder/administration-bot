import { type Repository } from "~/libs/types/types.js";
import { RegistrationStageModel } from "./registration-stage.model";
import { DEFAULT_REGISTRATION_STAGE_ID,
MAX_ORDER_COLUMN_NAME,
MIN_ORDER_COLUMN_NAME } from './libs/constants/constants.js';
import { RegistrationStageEntity } from "./registration-stage.entity";
import { type RegistrationStageQueryResponse } from './libs/types/types.js';
import { RegistrationStageTableColumnName } from "./libs/enums/registration-stage-table-column-name.enum";

class RegistrationStageRepository implements Repository{
    private registrationStageModel: typeof RegistrationStageModel;

    constructor(registrationStageModel: typeof RegistrationStageModel){
        this.registrationStageModel = registrationStageModel;
    }

    public async findById(id: number): Promise<RegistrationStageEntity | null>{
        const registrationStage = await this.registrationStageModel
            .query()
            .findById(id)
            .castTo<RegistrationStageQueryResponse | undefined>();

        if(!registrationStage){
            return null;
        }

        return RegistrationStageEntity.initialize({
            id: registrationStage.id,
            createdAt: new Date(registrationStage.createdAt),
            updatedAt:  new Date(registrationStage.updatedAt),
            name: registrationStage.name,
            orderNumber: registrationStage.orderNumber
        })
    }

    // public async create(entity: RegistrationStageEntity): Promise<RegistrationStageEntity>{
    //     const { name, orderNumber } = entity.toNewObject();

    //     const maxOrderNumberRow = await this.registrationStageModel
    //         .query()
    //         .select()
    //         .max(`${RegistrationStageTableColumnName.ORDER_NUMBER}
    //              as ${MAX_ORDER_COLUMN_NAME}`)
    //         .first()
    //         .castTo<{
    //             name: string,
    //             orderNumber: number,
    //             max_order_number: number
    //         } | null>()
    //     let maxOrderNumber = 0;
    //     if(maxOrderNumberRow){
    //         maxOrderNumber = maxOrderNumberRow[MAX_ORDER_COLUMN_NAME];
    //     }
    

    //     let registrationStage;
    //     if(orderNumber){
    //         if(orderNumber >= maxOrderNumberRow){
    //             registrationStage = await this.registrationStageModel
    //                 .query()
    //                 .insert({
    //                     name,
    //                     orderNumber
    //                 })
    //         }
    //     }

        
    // }
    public async getMaxOrderNumber(): Promise<number>{
        const result = await this.registrationStageModel
                .query()
                .max('orderNumber as maxOrderNumber')
                .first()
                .castTo<{
                    maxOrderNumber: number
                }>();
        return result.maxOrderNumber;
    }

}

export { RegistrationStageRepository };