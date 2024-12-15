import React from 'react'

import "../../sass/components/searchContainer/_advanced-search.scss";

const AdvancedSearch = () => {
  return (
    <div className="advanced-content">
            <form action="404.html" method="GET">
              <label htmlFor="name" className="label-class">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Smith"
                
              />

              <label htmlFor="email" className="label-class">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="johnsmith@leverx.com"
                
              />

              <label htmlFor="phone" className="label-class">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Phone number"
                
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
              <select id="building" name="building" >
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
              <select id="department" name="department" >
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
  )
}

export default AdvancedSearch