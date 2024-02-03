import { type Repository } from "~/libs/types/types.js";
import { type RegistrationStageModel } from "./registration-stage.model";
import { DEFAULT_REGISTRATION_STAGE_ID } from './libs/constants/constants.js';
import { RegistrationStageEntity } from "./registration-stage.entity";
import { type RegistrationStageQueryResponse } from './libs/types/types.js';

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

}

export { RegistrationStageRepository };