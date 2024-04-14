import { StageQueryResponse } from './stage-query-response.type.js';

type MinOrderNumberColumnType = {
    minOrderNumber: number;
}

type StageWithMinOrderNumberQueryResponse = 
StageQueryResponse & MinOrderNumberColumnType;

export { StageWithMinOrderNumberQueryResponse };
