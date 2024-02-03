import { RegistrationStageModel } from "./registration-stage.model.js";
import { RegistrationStageRepository } from './registration-stage.repository.js';

const registrationStageRepository = new RegistrationStageRepository(RegistrationStageModel);

export { registrationStageRepository };