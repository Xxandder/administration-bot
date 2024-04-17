import { Categories } from "~/libs/constants/constants";
import { AppealStatus } from "~/libs/enums/enums";

type AppealCardsProperties = {
    appealNumber: number;
    category: typeof Categories[number];
    status: keyof typeof AppealStatus
    date: string;
  }

export { type AppealCardsProperties };