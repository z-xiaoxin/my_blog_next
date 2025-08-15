export interface ILocationSearchRes {
  info: string;
  poiList: IPoiList;
}
export interface IPoiList {
  pois: IPoiItem[];
  count: number;
  pageIndex: number;
  pageSize: number;
}
export interface IPoiItem {
  id: string;
  name: string;
  type: string;
  location: [number, number];
  address: string;
  tel: string;
  distance: number;
  shopinfo: string;
}

export interface IAMap {
  Map: IMap;
  Geolocation: new (options?: object) => any;
  CitySearch: new () => any;
  Weather: new () => any;
  PlaceSearch: new (props: object) => any;
}

export type IMap = new (container: string, options?: object) => {
  addControl: (...args: any[]) => void;
};

export type IUseGDPluginFunc<T = unknown> = (
  GDProps: {
    AMap: IAMap;
    mapInstance: any;
  },
  ...args: any[]
) => T;

export interface IGeoLocationInfo {
  position: {
    getLng: () => number;
    getLat: () => number;
  };
}
export interface ICityInfo {
  status: string;
  info: string;
  infocode: string;
  province: string;
  city: string;
  adcode: string;
  rectangle: string;
  bounds: number[];
}
export interface IWeatherInfo {
  province: string;
  city: string;
  adcode: string;
  weather: string;
  temperature: number;
  windDirection: string;
  windPower: number;
  humidity: string;
  reportTime: string;
  info: string;
}
