import { AppealCardsProperties } from "../types/types";

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