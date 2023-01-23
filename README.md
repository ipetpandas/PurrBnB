# PurrBnB

## 🐈 **About**

PurrBnB is a full-stack web application cloned and inspired by Airbnb. The build currently supports two features for user interactivity: (1) Spots: allows users to host their own spot through create, read, update, and delete operations, and (2) Bookings: allows users to create bookings at those spots through create, read, and delete operations.

[Click to view PurrBnB Live](https://airbnb-clone-4afc.onrender.com/)

## 💻 **Tech Stack**

### Languages:

[![JavaScript][javascript-shield]][javascript-url]
[![HTML][html-shield]][html-url]
[![CSS][css-shield]][css-url]

### Backend Development:

[![Express][express-shield]][express-url]
[![sequelize][sequelize-shield]][sequelize-url]
[![sqlite][sqlite-shield]][sqlite-url]
[![postgresql][postgresql-shield]][postgresql-url]

### Frontend Development:

[![react][react-shield]][react-url]
[![react-router][react-router-shield]][react-router-url]
[![redux][redux-shield]][redux-url]

## ✨ **Features**:

### Splash Page

Users can Sign Up, Login, Log Out, and browse all spots

![img](https://i.imgur.com/ckVEkrw.gif)

### Spot Details

Users can browse individual spots

<img src="https://i.imgur.com/lTaTpgn.gif">

### Create Spot

Logged in users may create a spot
<img src="https://i.imgur.com/M8bdcvC.gif">

### Manage Spot

Users that own a spot may edit their spot via 'Manage My Spots' or directly on that Spot Details page

<img src="https://i.imgur.com/Eb6Wgx2.gif">

### Delete Spot

Users that own a spot may delete their spot

<img src="https://i.imgur.com/AHKgi9p.gif">

### Create Booking

Logged in users may create a booking

<img src="https://i.imgur.com/nBIfIiX.gif">

### Delete Booking

Logged in users may delete a booking

<img src="https://i.imgur.com/q9Cdk0a.gif">

## ✅ Roadmap

- [ ] Implement Update operation for bookings
- [ ] Implement Reviews feature
  - [ ] Create
  - [ ] Read
  - [ ] Update
  - [ ] Delete
- [ ] Create search functionality to filter spots

## 📁 Installation

1. Clone repo

2. Install dependencies in both backend and frontend directories

```sh
npm install
```

3. Run migration and seeders

```sh
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```

4. Run servers in both backend and frontend directories

```sh
npm start
```

## 📬 Contact me

[![linkedin][linkedin-shield]][linkedin-url]

<!-- MARKDOWN LINKS & IMAGES -->

[javascript-shield]: https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E
[html-shield]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[css-shield]: https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white
[express-shield]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[sequelize-shield]: https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue
[sqlite-shield]: https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white
[postgresql-shield]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[react-shield]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-router-shield]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[redux-shield]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[linkedin-shield]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[javascript-url]: https://www.javascript.com/
[html-url]: https://www.w3.org/html/
[css-url]: https://www.w3.org/Style/CSS/Overview.en.html
[express-url]: https://expressjs.com/
[sequelize-url]: https://sequelize.org/
[sqlite-url]: https://www.sqlite.org/index.html
[postgresql-url]: https://www.postgresql.org/
[react-url]: https://reactjs.org/
[react-router-url]: https://reactrouter.com/en/main
[redux-url]: https://redux.js.org/
[linkedin-url]: https://www.linkedin.com/in/nguyenpeterviet/
