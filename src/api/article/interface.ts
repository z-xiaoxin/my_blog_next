export interface IArticleListItem {
  _id: string;
  id: string;
  title: string;
}

export interface IArticleDetail extends IArticleListItem {
  content: string;
}

/** 通用列表类型接口 基础参数 */
export interface ICommonListReqBody {
  page?: number;
  page_size?: number;
}

export interface IArticleListReqBody extends ICommonListReqBody {
  title?: undefined;
  keyword?: string;
}

export interface IArticleUpdateReqBody extends IArticleListItem {
  content: string;
}

export interface IArticleAddReqBody extends IArticleListItem {
  content: string;
}
