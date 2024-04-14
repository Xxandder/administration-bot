import { ValueOf } from "~/libs/types/value-of.type.js";
import { RegistrationStage } from "../enums/registration-stage.enum.js";

type RegistrationStageValues = ValueOf<typeof RegistrationStage>;

export { RegistrationStageValues };