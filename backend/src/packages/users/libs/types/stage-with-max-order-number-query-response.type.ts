import { StageQueryResponse } from './stage-query-response.type.js';

type MaxOrderNumberColumnType = {
    maxOrderNumber: number;
}

type StageWithMaxOrderNumberQueryResponse = 
StageQueryResponse & MaxOrderNumberColumnType;

export { StageWithMaxOrderNumberQueryResponse };
