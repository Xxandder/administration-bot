import { RegistrationStageModel } from "./registration-stage.model.js";
import { BaseStageRepository } from "./base-stage.repository.js";

class RegistrationStageRepository extends BaseStageRepository{ 
    constructor(registrationStageModel: typeof RegistrationStageModel){
        super(registrationStageModel)
    }
}

export { RegistrationStageRepository };