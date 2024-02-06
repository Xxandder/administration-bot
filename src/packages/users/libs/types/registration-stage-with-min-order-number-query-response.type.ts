import { RegistrationStageQueryResponse } from './registration-stage-query-response.type.js';

type MinOrderNumberColumnType = {
    minOrderNumber: number;
}

type RegistrationStageWithMinOrderNumberQueryResponse = 
    RegistrationStageQueryResponse & MinOrderNumberColumnType;

export { RegistrationStageWithMinOrderNumberQueryResponse };
