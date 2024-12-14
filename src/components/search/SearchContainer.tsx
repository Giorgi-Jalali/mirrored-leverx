import React, { useState } from "react";
import "../../sass/pages/_home.scss";

import searchIcon from "/src/assets/search.png";

interface SearchContainerProps {
  searchQuery: string;
  handleSearch: (query: string) => void;
}

const SearchContainer: React.FC<SearchContainerProps> = ({
  searchQuery,
  handleSearch,
}) => {
  const [isBasicSearch, setIsBasicSearch] = useState(true);

  return (
    <aside>
      <div>
        <input
          type="radio"
          id="basic"
          name="toggle"
          checked={isBasicSearch}
          onChange={() => setIsBasicSearch(true)}
        />
        <label htmlFor="basic" id="basic-label">
          Basic Search
        </label>

        <input
          type="radio"
          id="advanced"
          name="toggle"
          checked={!isBasicSearch}
          onChange={() => setIsBasicSearch(false)}
        />
        <label
          htmlFor="advanced"
          id="advanced-label"
          className="advanced-label"
        >
          Advanced Search
        </label>
      </div>

      <div className="content">
        {isBasicSearch && (
          <div className="basic-content" style={{ display: "block" }}>
            <img
              src={searchIcon}
              alt="search icon"
              width="20px"
              height="20px"
              className="search"
            />
            <form
              action="./404.html"
              method="GET"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(searchQuery);
              }}
            >
              <input
                type="text"
                className="search-input"
                placeholder="John Smith"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                required
              />
              <button type="submit">Search</button>
            </form>
          </div>
        )}

        {!isBasicSearch && (
          <div className="advanced-content" style={{ display: "block" }}>
            <form action="404.html" method="GET">
              <label htmlFor="name" className="label-class">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Smith"
                required
              />

              <label htmlFor="email" className="label-class">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="johnsmith@leverx.com"
                required
              />

              <label htmlFor="phone" className="label-class">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Phone number"
                required
              />

              <label htmlFor="skype" className="label-class">
                Skype
              </label>
              <input
                type="text"
                id="skype"
                name="skype"
                placeholder="SkypeID"
              />

              <label htmlFor="building" className="label-class">
                Building
              </label>
              <select id="building" name="building" required>
                <option value="">Any</option>
                <option value="building-65">Pilsudskiego 65 (Poland)</option>
                <option value="building-66">Pilsudskiego 66 (Poland)</option>
                <option value="building-67">Pilsudskiego 67 (Poland)</option>
                <option value="building-68">Pilsudskiego 68 (Poland)</option>
                <option value="building-69">Pilsudskiego 69 (Poland)</option>
                <option value="building-70">Pilsudskiego 70 (Poland)</option>
              </select>

              <label htmlFor="room" className="label-class">
                Room
              </label>
              <input type="text" id="room" name="room" placeholder="303.1" />

              <label htmlFor="department" className="label-class">
                Department
              </label>
              <select id="department" name="department" required>
                <option value="">Any</option>
                <option value="web">Web & Mobile</option>
                <option value="cybersecurity">
                  Cybersecurity & Compliance
                </option>
                <option value="ui">UI/UX Design</option>
                <option value="backend">Backend & Integration</option>
                <option value="ai">AI & Data Science</option>
                <option value="cloud">Cloud & DevOps</option>
              </select>

              <button type="submit">Search</button>
            </form>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SearchContainer;
