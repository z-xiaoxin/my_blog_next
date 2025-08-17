"use client";

import "./GDMap.scss";
import "@amap/amap-jsapi-types";
// import { load as GDLoader } from "@amap/amap-jsapi-loader";
import { useEffect, useRef, useState } from "react";
import {
  ICityInfo,
  IGeoLocationInfo,
  IUseGDPluginFunc,
  IWeatherInfo,
} from "../../api/location/interface";
import MapSearch from "./MapSearch";

/**
 * Description 获取地理位置信息
 * @param {any} GDProps
 * @returns {any} */
const getGeoLocation: IUseGDPluginFunc<Promise<IGeoLocationInfo>> = (
  GDProps
) => {
  const geolocation = new GDProps.AMap.Geolocation({
    enableHighAccuracy: true,
    timeout: 10000,
    position: "RB",
    offset: [10, 20],
    zoomToAccuracy: true,
  });
  GDProps.mapInstance.addControl(geolocation);

  return new Promise((resolve, reject) =>
    geolocation.getCurrentPosition(function (
      status: string,
      result: IGeoLocationInfo
    ) {
      if (status === "complete") {
        resolve(result);
      } else {
        reject("获取失败");
      }
    })
  );
};

/**
 * Description 获取城市信息
 * @param {any} GDProps
 * @returns {any} */
const getCityInfo: IUseGDPluginFunc<Promise<ICityInfo>> = (GDProps) => {
  const citySearch = new GDProps.AMap.CitySearch();
  return new Promise<ICityInfo>((resolve, reject) =>
    citySearch.getLocalCity(function (status, result: ICityInfo) {
      if (status === "complete" && result.info === "OK") {
        resolve(result);
      } else reject();
    })
  );
};

/**
 * Description 获取城市天气信息
 * @param {any} GDProps
 * @param {any} cityInfo:number|string
 * @returns {any} */
const getWeatherInfo: IUseGDPluginFunc<Promise<IWeatherInfo>> = (
  GDProps,
  cityInfo: number | string
) => {
  const weather = new GDProps.AMap.Weather();
  return new Promise((resolve, reject) =>
    weather.getLive(cityInfo, function (err, data: IWeatherInfo) {
      if (err === null) {
        resolve(data);
      } else {
        reject(err);
      }
    })
  );
};

function UserLocation() {
  /** 高德地图道具 */
  const GDMap = useRef<{ AMap: any; mapInstance: AMap.Map }>(null);
  const [currentCityInfo, setCurrentCityInfo] = useState<ICityInfo>();
  const [geoLocationInfo, setGeoLocationInfo] = useState<IGeoLocationInfo>();
  const [mapCenter, setMapCenter] = useState<{ lng: number; lat: number }>();
  const [searchBarShow, setSearchBarShow] = useState(false);

  useEffect(() => {
    const loaderMap = async () => {
      const GDLoader = (await import("@amap/amap-jsapi-loader")).load;

      GDLoader({
        key: "de27e02aeca9784853cc36c1d18815d8",
        version: "2.0",
        plugins: [
          "AMap.Geolocation",
          "AMap.ToolBar",
          "AMap.ControlBar",
          "AMap.LngLat",
          "AMap.Marker",
          "AMap.CitySearch",
          "AMap.DistrictSearch",
          "AMap.Weather",
          "AMap.PlaceSearch",
          "AMap.Bounds",
          "AMap.Circle",
        ],
      }).then(async (AMap) => {
        const currentMap: AMap.Map = new AMap.Map("container", {
          resizeEnable: true,
          viewMode: "3D", //是否为3D地图模式
        });
        //添加控制罗盘控件，用来控制地图的旋转和倾斜
        currentMap.addControl(new AMap.ControlBar());
        currentMap.on("moveend", () => setMapCenter(currentMap.getCenter()));
        currentMap.on("click", () => setSearchBarShow(false));
        currentMap.on("dragstart", () => setSearchBarShow(false));

        const GDMapProps = { AMap, mapInstance: currentMap };
        GDMap.current = GDMapProps;

        const geoLocationInfo = await getGeoLocation(GDMapProps);
        setGeoLocationInfo(geoLocationInfo);
        const cityInfo = await getCityInfo(GDMapProps);
        setCurrentCityInfo(cityInfo);
      });
    };

    if (window) {
      window._AMapSecurityConfig = {
        securityJsCode: "e9480128b279083ca981d98bfbc0e6fc",
      };
      loaderMap();
    }

    return () => {};
  }, []);

  return (
    <div className="w-full flex-grow flex flex-col justify-center items-center relative">
      {/* 地图展示 */}
      <div className="w-full flex-grow" id="container"></div>

      {GDMap.current && currentCityInfo && mapCenter ? (
        <MapSearch
          GDProps={GDMap.current}
          currentCityInfo={currentCityInfo}
          mapCenter={mapCenter}
          searchBarShow={searchBarShow}
          setSearchBarShow={setSearchBarShow}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default UserLocation;
