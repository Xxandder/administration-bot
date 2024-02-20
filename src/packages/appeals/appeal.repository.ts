import { type Repository } from '~/libs/types/types.js';
import { type AppealModel } from './appeal.model.js';

class AppealRepository implements Repository{
    private appealModel: typeof AppealModel;

    public constructor(appealModel : typeof AppealModel){
        this.appealModel = appealModel
    }
}

export { AppealRepository };
