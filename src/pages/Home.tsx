import React from "react";

import "../sass/pages/_home.scss";

import SearchContainer from "../components/search/SearchContainer";
import ViewContainer from "../components/usersView/ViewContainer";
import { IEmployee } from "../types/EmployeeTypes";

interface IHomeProps {
  employees: IEmployee[];
}

const Home: React.FC<IHomeProps> = ({ employees }) => {
  return (
    <div className="home-main">
      <SearchContainer />
      <ViewContainer employees={employees} />
    </div>
  );
};

export default Home;
