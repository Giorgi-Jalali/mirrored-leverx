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
  searchQuery: string;
  handleSearch: (query: string) => void;
}

const Home: React.FC<IHomeProps> = ({ employees, searchQuery, handleSearch }) => {
  return (
    <div className="home-main">
      <SearchContainer searchQuery={searchQuery} handleSearch={handleSearch} />
      <ViewContainer employees={employees} searchQuery={searchQuery} />
    </div>
  );
};

export default Home;
