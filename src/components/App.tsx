import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Home = () => <h1>Home Page</h1>;
const Users = () => <h1>Users Page</h1>;
const Settings = () => <h1>Settings Page</h1>;
const NotFound = () => <h1>Page Not Found</h1>;
const UserProfile = ({ id }: { id: string }) => <h1>User Profile: {id}</h1>;

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/users/:id" element={<UserProfile id={''} />} />
      </Routes>
    </Router>
  );
};

export default App;
