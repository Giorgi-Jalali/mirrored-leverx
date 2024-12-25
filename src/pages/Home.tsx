import React from "react";

import SearchContainer from "../components/search/SearchContainer";
import ViewContainer from "../components/usersView/ViewContainer";
import "../sass/pages/_home.scss";

const Home: React.FC = () => {
  
  return (
    <div className="home-main">
      <SearchContainer />
      <ViewContainer />
    </div>
  );
};

export default Home;
