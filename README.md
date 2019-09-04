# stroll
Stroll is a React Native mobile app that allows you to create and find walks in your area. Walks focus on attractions and points of interested and can be filtered by category. Some of these categories include historical walks, architectural walks, scenic walks, and more. Stroll sits on the React Native Maps and Google Directions APIs to create a slick and intuitive user experience. 

## Installation
Start by installing [Expo](https://expo.io/learn) on your mobile device. 
Clone this repository to your local machine (don't forget to npm install).

Create a secrets.js file in the root directory.

Generate a [Google Directions API key](https://developers.google.com/maps/documentation/directions/start) and add it to your secrets file. 
```javascript
const googleSecret = '[YOUR API KEY]'
```

Download and initialize [ngrok](https://ngrok.com/). ngrok will allow you to securely tunnel and use your computer's local host on your mobile device. Add the ngrok server to your secrets file as well. 
```javascript
const ngrokSecret = '[YOUR NGROK SERVER]'
```

Create a new database called "capstone"
```bash
psql
createdb capstone
```
You must initialize the postGIS extension in the database in order to store geolocation data. If you have postgreSQL 11.5 or higher, postGIS should be an extension that was included in your download.
```bash
\c capstone
CREATE EXTENSION postgis;
SELECT postgis_full_version();
```
The above command should show you the version of postGIS in your database if the extension has been added successfully.

To initialize your server:
```bash
npm run start-dev
```
To initialize Expo:
```bash
npm start
```

To login, enter the email (test@test.com) and password (test). 

Get strollin'!

## Backend
Our database was created using PostgreSQL and Sequelize. One unique challenge was figuring out how to connect navigation points to a walk. Navigation points are saved in the database similar to a doubly linked list so that each navigation point points to the next navigation point. This structure makes it easy to retrieve and display a walk's navigation points in the correct order. 

![Imgur](https://i.imgur.com/IkpkWP4.png)

## Frontend
Our mobile app was created using React Native and Expo. The app was styled with CSS, React Native styled components and the NativeBase styling library. We wanted to create an intuitive user experience so we used React Navigation and set up a stack and dashboard navigator. We also created a dashboard with instructions on how to get started and help buttons along the way if the user got stuck. 

![Imgur](https://i.imgur.com/DyOS7X7l.png)    ![Imgur](https://i.imgur.com/4uzqkFBl.png) 

![Imgur](https://i.imgur.com/qCCCbIUl.png)    ![Imgur](https://i.imgur.com/HWJcHYSl.png)

## Built With
[React Native](https://facebook.github.io/react-native/) - mobile frontend framework

[Expo](https://expo.io/) - toolchain built around React Native

[NativeBase](https://nativebase.io) - UI component library for React Native

[React Navigation](https://reactnavigation.org/) - library managing the app navigation

[React Native Maps API](https://www.npmjs.com/package/react-native-maps) - maps API

[Google Directions API](https://cloud.google.com/maps-platform/routes/?utm_source=google&utm_medium=cpc&utm_campaign=FY18-Q2-global-demandgen-paidsearchonnetworkhouseads-cs-maps_contactsal_saf&utm_content=text-ad-none-none-DEV_c-CRE_289050149694-ADGP_Hybrid+%7C+AW+SEM+%7C+SKWS+~+Directions+API-KWID_43700035908081168-kwd-445998650286-userloc_9021715&utm_term=KW_%2Bdirections+%2Bapi-ST_%2Bdirections+%2Bapi&gclid=EAIaIQobChMIovLy6IK45AIViJ-fCh2EAAFHEAAYASAAEgLuCPD_BwE) - directions API

[React Native Maps Directions](https://www.npmjs.com/package/react-native-maps-directions) - directions component for React Native Maps

[Express](https://expressjs.com/) - web framework for node.js

[Sequelize](https://www.npmjs.com/package/sequelize) - ORM

[PostGIS](https://postgis.net/) - extension for PostgreSQL for geolocation data

[PostgreSQL](https://www.postgresql.org/) - open source object-relational database

## Authors
[Michelle Hoang](https://github.com/michelle-hoang)

[Ben Jenkins](https://github.com/benpjenkins)

[Madison Carr](https://github.com/madisoncarr)
