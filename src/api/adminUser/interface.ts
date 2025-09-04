import { ObjectId } from "mongodb";

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
  _id?: ObjectId;
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

export interface IAdminUserDetail extends IAdminUserListItem {
  pwd: string;
}
