# AppFinder - Website

The website is intended as a companion for [Appfinder-Server](https://github.com/yossisp/appfinder-server) project. It allows to search for detailed information regarding mobile apps from either Apple App Store or Google Play Store. You can search by typing the app id in the search bar or upload a CSV file with many app id's. In addition, the website displays a graph of searches on Google Trends for a specific app.

## How to run
The website doesn't provide much functionality on its own but rather should be used with [Appfinder-Server](https://github.com/yossisp/appfinder-server).
In order to use the website [Google client id](https://console.developers.google.com/apis/credentials) must be supplied for `REACT_APP_CLIENT_ID` in `npm` scripts. In addition, you need to add authorized [JavaScript origins and redirect URIs](https://www.themarketingtechnologist.co/google-oauth-2-enable-your-application-to-access-data-from-a-google-user/) in order to use it with [Appfinder-Server](https://github.com/yossisp/appfinder-server) or whatever hosting website/server service you're using.

After [Appfinder-Server](https://github.com/yossisp/appfinder-server) is running, the website can be run:

1. From docker container (`docker-compose` must be installed):
	- `cd appstore_front`
	- `docker-compose -f docker-compose-prod.yml build && docker-compose -f docker-compose-prod.yml up -d`
	- By now the website will be available at http://localhost (port 80).
2. Locally by:
	- `cd appstore_front`
	- `npm install`
	- `npm test`
	- This will open the website locally at `http://localhost:3005`.

## Website Functionality and Available Screens

1. [**Login**](https://imgur.com/lybv84e) - welcome screen for the website. The website allows to log in using Google account credentials.
2. **Search Bar** - from any screen, searching for an app is possible from the blue search bar at the top of the website.

![](https://imgur.com/bnUMvge.png)

3. [**About**](https://imgur.com/9HCXa4f) - displays general information about the website and the motivation behind it. It also contains a dialog explaining what an app id is.
4. [**AppInfo**](https://imgur.com/5Rd7vZS) - displays information related to a specific app. There's also an expansion bar in this page which if clicked will expand to show the graph of Google searches activity per the app.
4. [**Upload CSV**](https://imgur.com/FLw6Qqq) - allows to upload a CSV file containing app id's.
5. Upon clicking `Enter` in search bar without entering any app id or entering an app id for an app which doesn't exist, a **snackbar** warning will pop up.

![](https://imgur.com/0aosvO1.png)

6. When using the website on a smartphone and after searching and receiving information regarding a specific app, if the phone is held in portrait mode, a [**message**](https://imgur.com/CYZtPPw) will be displayed asking to switch to landscape mode.

## Technologies and Frameworks Used

- React.js
- Redux and Redux devtools
- OAuth2 in order to enable login with Google
- [Material UI](https://material-ui.com) package for website design and most of its elements
- [JWT](https://jwt.io/)
- Nginx to serve the website in production
- Docker

## Main Challenges
- This is my first project in React.js so learning React.js was the main challenge.
- I liked practicing functional programming.
- Adding OAuth2 Google login.
- Working with CORS.
- Recognition of portrait/landscape mode.

## Browser Compatibility

- Chrome Desktop
- Safari Desktop
- Chrome Mobile (without CSV upload functionality)
- Safari Mobile (without CSV upload functionality)