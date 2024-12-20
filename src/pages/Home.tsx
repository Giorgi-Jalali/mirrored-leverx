import React from "react";

import "../sass/pages/_home.scss";

import SearchContainer from "../components/search/SearchContainer";
import ViewContainer from "../components/usersView/ViewContainer";
import { IEmployee } from "../types/EmployeeTypes";
import { useGetEmployeesQuery } from "../services/employeeApi";

const Home: React.FC = () => {
  
  return (
    <div className="home-main">
      <SearchContainer />
      <ViewContainer />
    </div>
  );
};

export default Home;
