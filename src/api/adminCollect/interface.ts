export interface ICollectItem {
  _id: string;
  event: "page_view";
  ts: number;
  projectId: string;
  sessionId: "sess_one"; // SDK 先临时生成，服务端可重写
  visitorId: string;
  userId: string;
  url: string;
  referrer: string;
  title: string;
  screen: { w: 1440; h: 900; dpr: 2 };
  locale: "zh-CN";
  ua: string; // 也可由服务端从 header 取
  ip: string; // 服务端采集；响应中不回显
  utm: { source: "google"; medium: "cpc"; campaign: "spring" };
  props: { btnId: "buy"; plan: "pro" }; // 自定义属性（展平索引前缀）
  v: 1; // schema 版本
  // idempotencyKey: "uuid-req-xxx"; // 幂等去重
}

export type IAddCollectReqBody = Omit<ICollectItem, "_id">;
