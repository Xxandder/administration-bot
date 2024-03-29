import { CreatingAppealStageModel } from "./creating-appeal-stage.model.js";
import { BaseStageRepository } from "./base-stage.repository.js";

class CreatingAppealStageRepository extends BaseStageRepository{ 
    constructor(creatingAppealStageModel: typeof CreatingAppealStageModel){
        super(creatingAppealStageModel)
    }
}

export { CreatingAppealStageRepository };