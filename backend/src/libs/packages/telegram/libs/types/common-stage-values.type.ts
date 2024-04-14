import { ValueOf } from "~/libs/types/value-of.type.js";
import { CommonStage } from "../enums/enums.js";

type CommonStageValues = ValueOf<typeof CommonStage>;

export { type CommonStageValues };