export { AppealTableColumnName } from './libs/enums/enums.js';
import { AppealModel } from './appeal.model.js';
import { AppealRepository } from './appeal.repository.js';
import { AppealService } from './appeal.service.js';

const appealRepository = new AppealRepository(AppealModel);

const appealService = new AppealService(appealRepository);

export { appealService };
