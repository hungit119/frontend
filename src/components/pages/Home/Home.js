import axios from "axios";
import className from "classnames/bind";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { apiUrl, tabs } from "../../../constants";
import { setIsLoadingFilms } from "../../../redux/actions/controlAction";
import {
  setFilmsLastestMovies,
  setFilmsLastestTv,
  setFilmsTrending,
  setFilmsTypeMovies,
  setFilmsTypeTv,
} from "../../../redux/actions/filmsAction";
import { filmsTypeSelector } from "../../../redux/selectors";
import ResponseApiHandle from "../../../utils/ResponseApiHandle";
import ButtonGroupShare from "../../ButtonGroupShare";
import ListMovies from "../../ListMovies/ListMovies";
import SessionsHome from "../../SessionsHome";
import styles from "./Home.module.scss";
const cx = className.bind(styles);

const HomePage = () => {
  let params = useParams();
  const dispatch = useDispatch();
  const filmsType = useSelector(filmsTypeSelector);
  // get api
  const getMovies = async (urlApi, actionDispatch) => {
    try {
      dispatch(setIsLoadingFilms(true));
      const response = await axios.get(urlApi);
      ResponseApiHandle(response, (resData) => {
        dispatch(actionDispatch(resData.filmsType));
        dispatch(setIsLoadingFilms(false));
      });
    } catch (errors) {
      console.log(errors.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getMovies(
      `${apiUrl}/films/type/movie?limit=24&year=2022`,
      setFilmsTypeMovies
    );
    getMovies(`${apiUrl}/films/type/TV-Series?limit=24`, setFilmsTypeTv);
    getMovies(`${apiUrl}/films/=/rating/5?limit=24`, setFilmsTrending);
    getMovies(`${apiUrl}/films/lastest/movie?limit=16`, setFilmsLastestMovies);
    getMovies(`${apiUrl}/films/lastest/TV-Series?limit=16`, setFilmsLastestTv);
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("content-header")}>
        <h1 className={cx("content-header-title")}>
          flixtor.video - Watch the Latest Movies and TV Shows for Free with No
          registration!
        </h1>
        <span className={cx("content-header-description")}>
          flixtor.video - flixtors, flixtor, flixtor movies, flixtor online
          movies, movies flixtor
        </span>
        <span className={cx("content-header-description")}>
          Watch your movies, tv shows online free in flixtor.video - no tracking
          - no ads - no virus.
        </span>
        <span className={cx("content-header-btn-shares")}>
          <ButtonGroupShare />
        </span>
      </div>

      {/* List movies */}
      <SessionsHome title={"Recommended"} tabs={tabs}>
        {params.param.match("movies") && (
          <ListMovies items={filmsType.movies} />
        )}
        {params.param.match("tv-shows") && (
          <ListMovies items={filmsType.tvSeries} />
        )}
        {params.param.match("trending") && (
          <ListMovies items={filmsType.trending} />
        )}
      </SessionsHome>
      <SessionsHome title={"Lastest Movies"} viewall={true} href="movies">
        <ListMovies items={filmsType.lastest.movies} />
      </SessionsHome>
      <SessionsHome title={"Lastest TV Series"} viewall={true} href="tv-series">
        <ListMovies items={filmsType.lastest.tvSeries} />
      </SessionsHome>
    </div>
  );
};

export default HomePage;
