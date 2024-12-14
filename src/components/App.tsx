import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Users from '../pages/Users';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';

import Header from './header/Header';

type Employee = {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
  user_avatar: string;
  department: string;
  room: string;
};

const UserProfile = ({ id }: { id: string }) => <h1>User Profile: {id}</h1>;

const App: React.FC = () => {
  const dbUrl = "http://localhost:3001/users";

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetch(`${dbUrl}`)
      .then((response) => response.json())
      .then((data: Employee[]) => setEmployees(data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              employees={employees} 
              searchQuery={searchQuery} 
              handleSearch={handleSearch} 
            />
          } 
        />
        <Route path="/users" element={<Users />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/users/:id" element={<UserProfile id={''} />} />
      </Routes>
    </Router>
  );
};

export default App;
