# REACT NEIGHBORHOOD MAP

Project 8  - Final Project built in React. It uses Repsonsive Off-Canvas pattern with accessibility

## For Users

- The application shows you Restaurant **locations in Northampton, UK**
- You can access the navigation menu by clicking on the hamburger menu
- You can filter this list by typing the name of your desired location in the input bar. The list will adjust accordingly
- When clicking on a name in the list, marker will show you location with open InfoWindow
- By clicking on the list of names or one of the markers, infoWindow will pop up
- The content of the info window displays more information about current location

## For Developers

### Get Started

- **Clone** this repository
- In your **terminal** go to the **root** of this repository
- Run `npm install`
- Run `npm start`
- The application will open in your browser

### Project was built on

- The project was built on `create-react-app`
- It uses [`recompose`](https://github.com/)
-  [`react-google-maps`](https://github.com/)
-  [`superagent`](https://github.com/)
- Google Maps APi


### Project hierarchy

The hierarchy of the React components is the following:

```
<Main />
--- <Navigation />
--- <Map />
```
