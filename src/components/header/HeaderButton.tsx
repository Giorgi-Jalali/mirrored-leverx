import React from 'react'
import { Link, useLocation } from "react-router-dom";
import "../../sass/layout/_header.scss";

interface IHeaderButton {
    imgSrc: string | undefined;
    imgAlt: string;
    txt: string;
    path: string;
    clickHandler?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const HeaderButton: React.FC<IHeaderButton> = ({imgSrc, imgAlt, txt, path, clickHandler}) => {
  return (
    <Link to={path} className="nav-link" onClick={clickHandler}>
          <img src={imgSrc} alt={`${imgAlt} icon`} width="30px" height="30px" />
          <p>{txt}</p>
    </Link>
  )
}

export default HeaderButton