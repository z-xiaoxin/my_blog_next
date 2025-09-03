import { getDbCollection } from "@/lib/mongodb";

/** 访客统计 */
export const getCollectCol = getDbCollection({ colName: "collect" });
