import { RegistrationStageQueryResponse } from './registration-stage-query-response.type.js';

type MaxOrderNumberColumnType = {
    maxOrderNumber: number;
}

type RegistrationStageWithMaxOrderNumberQueryResponse = 
    RegistrationStageQueryResponse & MaxOrderNumberColumnType;

export { RegistrationStageWithMaxOrderNumberQueryResponse };
