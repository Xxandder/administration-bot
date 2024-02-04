import { type Repository } from "~/libs/types/types.js";
import { RegistrationStageModel } from "./registration-stage.model.js";
import { DEFAULT_REGISTRATION_STAGE_ID,
MAX_ORDER_COLUMN_NAME,
MIN_ORDER_COLUMN_NAME } from './libs/constants/constants.js';
import { RegistrationStageEntity } from "./registration-stage.entity.js";
import { type RegistrationStageQueryResponse,
type RegistrationStageWithMaxOrderNumberQueryResponse,
type RegistrationStageWithMinOrderNumberQueryResponse } from './libs/types/types.js';
import { RegistrationStageTableColumnName } from "./libs/enums/registration-stage-table-column-name.enum.js";

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

    public async findByOrderNumber(orderNumber: number): Promise<RegistrationStageEntity | null>{
        const registrationStage = await this.registrationStageModel
            .query()
            .findOne({orderNumber})
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

    
        
    public async getLastOrderNumber(): Promise<number>{
        const result = await this.registrationStageModel
                .query()
                .max(`${RegistrationStageTableColumnName.ORDER_NUMBER}
                    as ${MAX_ORDER_COLUMN_NAME}`)
                .first()
                .castTo<RegistrationStageWithMaxOrderNumberQueryResponse>();
        return result[MAX_ORDER_COLUMN_NAME];
    }

    public async getFirstOrderNumber(): Promise<number>{
        const result = await this.registrationStageModel
                .query()
                .min(`${RegistrationStageTableColumnName.ORDER_NUMBER}
                    as ${MIN_ORDER_COLUMN_NAME}`)
                .first()
                .castTo<RegistrationStageWithMinOrderNumberQueryResponse>();
        return result[MIN_ORDER_COLUMN_NAME];
    }

}

export { RegistrationStageRepository };