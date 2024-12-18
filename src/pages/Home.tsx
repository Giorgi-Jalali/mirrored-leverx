import React from "react";

import "../sass/pages/_home.scss";

import SearchContainer from "../components/search/SearchContainer";
import ViewContainer from "../components/usersView/ViewContainer";


type Employee = {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
  user_avatar: string;
  department: string;
  room: string;
};

interface IHomeProps {
  employees: Employee[];
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
