import React from "react";
import { Link } from "react-router-dom";

import Button from "../components/button/Button";
import "../sass/pages/_404.scss";

const NotFoundPage: React.FC = () => {
  return (
    <main className="not-found-page">
      <img
        src="/assets/404.png"
        alt="not found"
        width="400px"
        height="225px"
        className="image404"
      />
      <p>Sorry, we can&apos;t find that page! It might be an old link or maybe it was moved.</p>
      <Link to="/">
        <Button className="not-found-button" text="GO TO THE HOME PAGE" />
      </Link>
    </main>
  );
};

export default NotFoundPage;
