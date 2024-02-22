import { type Service } from "~/libs/types/types.js";
import { type AppealRepository } from "./appeal.repository.js";


class AppealService implements Service{
    private appealRepository: typeof AppealRepository;

    constructor(appealRepository: typeof AppealRepository){
        this.appealRepository = appealRepository;
    }

    

}

export { AppealService };