import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import React from "react";
import { NavLink } from "react-router-dom";
import { Col } from "react-bootstrap";
import styles from "./MenuItemProfile.module.scss";
const cx = classNames.bind(styles);

const MenuItemProfile = ({ icon, title, type, to }) => {
  return (
    <>
      {type === "button" ? (
        <div className={cx("wrapper")}>
          {icon} {title}
        </div>
      ) : (
        <NavLink
          to={to}
          className={(nav) => cx("wrapper", { active: nav.isActive })}
        >
          {icon} {title}
        </NavLink>
      )}
    </>
  );
};

export default MenuItemProfile;
