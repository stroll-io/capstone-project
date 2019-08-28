# stroll
Stroll is a React Native mobile app that allows you to create and find walks in your area. Walks focus on attractions and points of interested and can be filtered by category. Some of these categories include historical walks, architectural walks, scenic walks, and more. Stroll sits on the React Native Maps and Google Directions API to create a slick and intuitive user experience. 

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
Our database was created using PostgreSQL and Sequelize. One unique feature was figuring out how to connect navigation points to a walk. Navigation points are saved in the database similar to a doubly linked list so that each navigation point points to the next navigation point. This structure makes it easy to retrieve and display a walk's navigation points in the correct order. 

![Imgur database image](https://i.imgur.com/IkpkWP4.png)

## Frontend
Our mobile app was created using React Native and Expo. The app was styled with CSS, React Native styled components and the NativeBase styling library. 
