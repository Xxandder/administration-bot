import { RegistrationStageQueryResponse } from './registration-stage-query-response.type';

type MinOrderNumberColumnType = {
    minOrderNumber: number;
}

type RegistrationStageWithMinOrderNumberQueryResponse = 
    RegistrationStageQueryResponse & MinOrderNumberColumnType;

export { RegistrationStageWithMinOrderNumberQueryResponse };
