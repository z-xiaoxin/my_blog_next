import { getDbCollection } from "@/lib/mongodb";
import { ICollectItem } from "./interface";

/** 访客统计 */
export const getCollectCol = getDbCollection<Partial<ICollectItem>>({
  colName: "collect",
});
