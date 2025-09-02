export interface IAdminLoginReqBody {
  uid: string;
  pwd: string;
}

export interface IAdminLoginRes {
  token: string;
}

export interface IAdminUserListReqBody {
  page: number;
  page_size: number;
}

export interface IAdminUserListItem {
  _id: string;
  uid: string;
  username: string;
  avatar: string;
  role: number[];
}

export interface IAddAdminUserReqBody {
  uid: string;
  username: string;
  pwd: string;
  avatar: string;
  role: number[];
}
