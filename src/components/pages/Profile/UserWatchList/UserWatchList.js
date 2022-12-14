import { faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiUrl } from "../../../../constants";
import { setFilmsWatchList } from "../../../../redux/actions/filmsAction";
import { filmsWatchListSelector } from "../../../../redux/selectors";
import ResponseApiHandle from "../../../../utils/ResponseApiHandle";
import MenuDropDownSearch from "../../../MenuDropDownSearch";
import TippyHeadLess from "../../../TippyHeadLess";
import styles from "./UserWatchList.module.scss";
import WatchList from "./WatchList";
const cx = classNames.bind(styles);

const sortMenu = [
  "Default",
  "Recently Added",
  "Name A-Z",
  "IMDb",
  "Release Date",
];

const UserWatchList = () => {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("Default");
  const filmsWatchList = useSelector(filmsWatchListSelector);
  const getWatchList = async () => {
    try {
      const response = await axios.get(`${apiUrl}/films/watch-list`);
      ResponseApiHandle(response, (resData) => {
        dispatch(setFilmsWatchList(resData.data));
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleClickFilter = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/films/watch-list?sortBy=${sortBy}`
      );
      ResponseApiHandle(response, (resData) => {
        dispatch(setFilmsWatchList(resData.data));
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getWatchList();
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header-content")}>
        <div className={cx("header-content-title")}>Watch List</div>
      </div>
      <div className={cx("content")}>
        <div className={cx("filter")}>
          <TippyHeadLess
            menuTippy={
              <MenuDropDownSearch
                menus={sortMenu}
                size={"small"}
                grid={12}
                title={"Sort"}
                type={"radio"}
                setOptions={setSortBy}
              />
            }
            position={"bottom-start"}
          >
            <span className={cx("btn-filter")}>
              <FontAwesomeIcon icon={faSort} /> Sort{" "}
              <span className={cx("sort-value")}>
                {sortBy.length === 0 ? "Default" : sortBy}
              </span>
            </span>
          </TippyHeadLess>
          <div
            className={cx("btn-filter", "filter-fea")}
            onClick={handleClickFilter}
          >
            <FontAwesomeIcon icon={faFilter} /> Filter
          </div>
        </div>
        <div className={cx("watch-list")}>
          <WatchList data={filmsWatchList} />
        </div>
      </div>
    </div>
  );
};

export default UserWatchList;
