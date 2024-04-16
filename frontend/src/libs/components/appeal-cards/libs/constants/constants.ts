import { Categories } from "~/libs/constants/constants";
import { AppealStatus } from "~/libs/enums/enums";

type AppealCardsProperties = {
    appealNumber: number;
    category: typeof Categories[number];
    status: keyof typeof AppealStatus
    date: string;
  }

const mockAppeals: AppealCardsProperties[]  = [
    {
        appealNumber:1000,
        category:"Відсутнє освітлення",
        status:"WAITING",
        date:"22.02.2024"
    },
    {
        appealNumber:1001,
        category:"Загроза опаду бурульок",
        status:"FINISHED",
        date:"22.02.2024"
    },
    {
        appealNumber:1002,
        category:"Інше",
        status:"IN_WORK",
        date:"22.05.2024"
    }

]

export { mockAppeals }