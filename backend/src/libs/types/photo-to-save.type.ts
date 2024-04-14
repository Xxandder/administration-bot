import { ContentType } from "../enums/content-type.enum.js";
import { ValueOf } from "./value-of.type.js";

type PhotoToSave = {
    path: string,
    contentType: ValueOf<typeof ContentType>;
}

export { type PhotoToSave };