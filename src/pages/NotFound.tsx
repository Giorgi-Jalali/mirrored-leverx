import React from "react";
import { Link } from "react-router-dom";
import "../sass/pages/_404.scss";

const NotFoundPage: React.FC = () => {
  return (
    <main className="not-found-page">
      <img
        src="../assets/404.png"
        alt="not found"
        width="400px"
        height="225px"
        className="image404"
      />
      <p>Sorry, we can't find that page! It might be an old link or maybe it was moved.</p>
      <Link to="/">
        <button className="not-found-button">GO TO THE HOME PAGE</button>
      </Link>
    </main>
  );
};

export default NotFoundPage;
