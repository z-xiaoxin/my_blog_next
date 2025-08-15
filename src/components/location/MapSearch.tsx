"use client";

import { KeyboardEventHandler, useRef, useState } from "react";
import {
  ICityInfo,
  ILocationSearchRes,
  IPoiItem,
} from "../../../api/location/interface";
import { clickEventStop } from "@/utils/hander";
import classNames from "classnames";
import { Icon } from "@iconify/react";

function MapSearch({
  GDProps,
  currentCityInfo,
  mapCenter,
  searchBarShow,
  setSearchBarShow,
}: Readonly<{
  GDProps: { AMap: any; mapInstance: AMap.Map };
  currentCityInfo: ICityInfo;
  mapCenter: { lng: number; lat: number };
  searchBarShow: boolean;
  setSearchBarShow: (param: boolean) => void;
}>) {
  const placeSearchIns = useRef(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [keywords, setKeywords] = useState("");
  const [searchResult, setSearchResult] = useState<ILocationSearchRes>();

  const searchPlace = (props: {
    city: string;
    centerPoint: number[];
    keywords: string;
  }): Promise<ILocationSearchRes> => {
    const PlaceSearchOptions = {
      city: props.city,
      type: "",
      pageSize: 10,
      pageIndex: 1,
      extensions: "base",
    };

    if (!placeSearchIns.current)
      placeSearchIns.current = new GDProps.AMap.PlaceSearch(PlaceSearchOptions);

    return new Promise((resolve, reject) => {
      console.log();

      if (placeSearchIns.current) {
        placeSearchIns.current.searchNearBy(
          props.keywords,
          props.centerPoint,
          20000,
          (status, result) => {
            console.log(status, result);

            if (status === "complete" && result.info === "OK") {
              resolve(result);
            } else {
              reject("search failed");
            }
          }
        );
      }
    });
  };

  const onSearch = async () => {
    const searchRes = await searchPlace({
      city: currentCityInfo?.city ?? "",
      centerPoint: mapCenter,
      keywords,
    });

    setSearchResult(searchRes);
    setSearchResultMarker(searchRes.poiList.pois);
  };

  const enterKeyToSearch: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.code === "Enter") onSearch();
    else if (e.code === "Escape") setSearchBarShow(false);
  };

  const pointContent = (
    name: string
  ) => `<div class="flex flex-col items-center w-max">
    <i class="w-5 h-5 block border-[5px] shadow-md border-white bg-[#409eff] rounded-full"></i>
    <p class="text-[14px] font-bold text-shadow-2xs">${name}</p>
  </div>`;

  const markerRemoveList = useRef<(() => void)[]>([]);

  /**
   * Description 为搜索结果设置 标记
   * @param {any} GDProps
   * @param {any} poi:IPoiItem[]
   * @returns {any}   */
  const setSearchResultMarker = (poi: IPoiItem[]) => {
    // 清除历史标记
    clearSearchResultMarker();

    poi.forEach((item) => {
      const marker = new GDProps.AMap.Marker({
        position: item.location, // 圆心位置
        content: pointContent(item.name),
        offset: [0, -10],
        anchor: "top-center",
      });
      GDProps.mapInstance.add(marker);
      markerRemoveList.current.push(() => GDProps.mapInstance.remove(marker));
    });
    GDProps.mapInstance.setFitView();
  };

  /**
   * Description 清除搜索结果
   * @returns {any} */
  const clearSearchResult = () => {
    setSearchResult(undefined);
    clearSearchResultMarker();
    searchRef.current?.focus();
  };

  /**
   * Description 清除标记
   * @returns {any} */
  const clearSearchResultMarker = () => {
    if (markerRemoveList.current.length) {
      markerRemoveList.current.forEach((fn) => fn());
      markerRemoveList.current = [];
    }
  };

  /**
   * Description 选择搜索结果
   * @param {any} poi:IPoiItem
   * @returns {any} */
  const poiSelect = (poi: IPoiItem) => {
    GDProps?.mapInstance.setCenter(poi.location);
    GDProps?.mapInstance.setZoom(17);
    setSearchBarShow(false);
  };

  return (
    <>
      {/* 搜索层 */}
      <div className="w-full absolute inset-0 pointer-events-none z-50 p-2">
        <div className="w-full h-full overflow-hidden relative">
          <div
            onClick={(e) => {
              clickEventStop(e);
              setSearchBarShow(true);
              searchRef.current?.focus();
            }}
            className={classNames(
              "absolute top-2 left-0 bg-white rounded-md z-20 p-2 transition-all duration-300 scale-75 origin-top-left hover:scale-100 cursor-pointer",
              searchBarShow
                ? "opacity-0 pointer-events-none scale-100"
                : "pointer-events-auto"
            )}
          >
            <Icon icon="si:search-line" width={30} height={30} />
          </div>

          <div
            className={classNames(
              "absolute w-full h-full p-2 z-10 transition-all duration-300",
              searchBarShow ? "translate-x-0" : "translate-x-[-100%]"
            )}
          >
            {/* 搜索框 开始 */}
            <div
              onClick={clickEventStop}
              className="w-full flex items-center justify-center pointer-events-auto bg-white rounded-md p-2 pl-3"
            >
              <div className="flex-grow">
                <input
                  ref={searchRef}
                  value={keywords}
                  className="w-full border-none outline-none"
                  onChange={(e) => {
                    setKeywords(e.target.value ?? "");
                  }}
                  onKeyDown={enterKeyToSearch}
                  type="text"
                />
              </div>
              <button
                onClick={onSearch}
                className="flex-none ml-2 px-3 py-1 rounded-md bg-[#409eff] transition-all text-white cursor-pointer active:scale-95"
              >
                搜索
              </button>
            </div>
            {/* 搜索框 结束 */}

            <div
              onClick={clickEventStop}
              className="pointer-events-auto w-full bg-white rounded-md p-2 mt-2"
            >
              {/* {JSON.stringify(searchResult)} */}
              <div className="w-full leading-4 py-1 flex justify-end items-center px-2 pb-1 border-b-[1px] border-solid border-b-[#e1e1e1] mb-2">
                {/* 清除按钮 开始 */}
                <div
                  onClick={clearSearchResult}
                  className="text-[14px] active:text-[#44a2ff] flex items-center cursor-pointer select-none"
                >
                  清除
                  <Icon
                    icon="material-symbols-light:delete-outline-rounded"
                    width={18}
                    height={18}
                  />
                </div>
                {/* 清除按钮 结束 */}
              </div>
              <ul className="w-full ">
                {searchResult?.poiList.pois.map((i) => (
                  <li
                    className="w-full h-8 p-2 hover:bg-[#409eff22] transition-all text-[14px] leading-4 rounded-md cursor-pointer"
                    key={i.id}
                    onClick={() => poiSelect(i)}
                  >
                    {i.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MapSearch;
