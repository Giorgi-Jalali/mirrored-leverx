# LEVERX - EMPLOYEE SERVICES

## Table of contents

- [Overview](#overview)
  - [How to launch the app](#how-to-launch-the-app)
  - [How to test](#how-to-test)
  - [The challenge](#the-challenge)
- [My process](#my-process)
  - [Technical Requirements](#technical-requirements)
- [Author](#author)

## Overview

### How to launch the app

Browser extension - "Cross Domain - CORS" (without it there is a CORS error)

- `yarn install`

It needs two terminals:

- `yarn run server` (for json-server)
- `yarn start`

Production:

- `yarn build`
- `yarn run server` (for json-server)
- `yarn start-pro`

Eslint Check:

- `yarn lint`

### How to test

- Admin - sophia@sophia.com - password: 1234  
- Admin - mitchell@mitchell.com - password: 12345  
- HR - james@james.com - password: 123  
- Employee with manager - olivia@olivia.com - password: abc  
- Employee with manager - ethan@ethan.com - password: ggg  
- Employee without manager - benjamin@benjamin.com - password: 1212  

### The challenge

Users should be able to:

1. Log in and log out.  
2. During log in, users can check "remember me," which allows their login info to persist even if the browser tab is closed. Otherwise, login info is lost when the tab is closed.  
3. Perform a basic search that searches only by first name and last name.  
4. Use advanced search to search by email, room number, department, and more.  
5. Switch between grid view and list view, with a count of how many employees are found.  
6. Access the settings page, visible only to admins.  
7. On the settings page, admins can edit all employees' roles except their own.  
8. Use the same basic search (first name and last name) on the settings page.  
9. Access a user page that displays detailed info about the user.  
10. On the user page, admins can edit all users' information. Managers/HR can edit the information of users they manage, while employees have read-only access.  
11. Edit information by clicking an "edit" button, visible to admins and HR.  
12. View dates in different formats as implemented.  
13. Use a "copy" button to copy the URL of a page. Users can open the same page in a new tab if "remember me" was checked during login.  

## My process

### Technical Requirements

- [Plain HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) - Markup Language  
- [Sass/SCSS](https://sass-lang.com/) - For styles  
- [Webpack](https://webpack.js.org/) - The Build Tool for the Web  
- [Typescript](https://www.typescriptlang.org/) - For types  
- [JSON Server](https://www.npmjs.com/package/json-server) - For data  
- [React](https://reactjs.org/) - JS library  
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management, including API calls with RTK Query  

## Author

- Giorgi Jalali
