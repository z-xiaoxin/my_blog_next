import { EReqMessageCode, EReqStatus } from "./interface";

// export const apiResponse: Record<"FAIL" | "SUCCESS", IResponseFunc> = {
//   FAIL: ({ status, message, data }) => {
//     return Response.json({
//       status: status ?? EReqStatus.FAIL,
//       message: message ?? EReqMessage.FAIL,
//       data: data ?? {},
//     });
//   },

//   SUCCESS: ({ status, message, data }) => {
//     return Response.json({
//       status: status ?? EReqStatus[SUCCESS],
//       message: message ?? EReqMessage.FAIL,
//       data: data ?? {},
//     });
//   },
// };

export type EPartOfType = keyof typeof EReqStatus;

export interface IResponseParams {
  status?: EReqStatus | number;
  messageCode?: string;
  data?: object;
}

/**
 * Description 统一响应格式
 * @param {any} type:T="SUCCESS"asT
 * @param {any} ...[params]:Textends"CUSTOM"?[Required<IResponseParams>]//CUSTOM→必传:[IResponseParams?]//非CUSTOM→可选
 * @returns {any} */
export const apiResponse = <T extends EPartOfType | "CUSTOM">(
  type: T = "SUCCESS" as T,
  ...[params]: T extends "CUSTOM"
    ? [Required<IResponseParams>] // CUSTOM → 必传
    : [IResponseParams?] // 非 CUSTOM → 可选
): Response => {
  const { status, messageCode, data = {} } = (params ?? {}) as IResponseParams;

  // CUSTOM 模式 → 完全自定义
  if (type === "CUSTOM") {
    return Response.json({
      status,
      messageCode,
      data,
    });
  }

  return Response.json({
    status: status ?? EReqStatus[type as EPartOfType],
    messageCode: messageCode ?? EReqMessageCode[type as EPartOfType],
    data: data ?? {},
  });
};
