export interface IResCommon<T extends object = object> {
  status: number;
  data: T;
  messageCode: string;
}

export interface IResRows<T extends object = object> {
  rows: T[];
  total: number;
}

export enum EReqStatus {
  SUCCESS = 0,
  FAIL = 101,
  OUT_OF_RANGE = 501,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
}

export enum EReqMessageCode {
  SUCCESS = "SUCCESS",
  FAIL = "FAIL",
  OUT_OF_RANGE = "OUT_OF_RANGE",
  NOT_FOUND = "NOT_FOUND",
  UNAUTHORIZED = "UNAUTHORIZED",
}
