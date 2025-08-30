export interface IResCommon<T extends object = object> {
  status: number;
  data: T;
  message: string;
}

export interface IResRows<T extends object = object> {
  rows: T[];
  total: number;
}

export enum EReqStatus {
  success = 0,
  fail = 101,
  outOfRange = 501,
}
