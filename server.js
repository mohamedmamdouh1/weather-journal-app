/*** CRITERIA.5 APP API Endpoint ***/
// Setup empty JS object to act as endpoint for all routes,
/** MODIFIED: The format for this object should be as follow: */
const projectData = {};

/*** CRITERIA.1 Node and Express Environment ***/
// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Initialize the main project folder: the Express app instance pointed to the project folder: website
app.use(express.static('website'));

/*** CRITERIA.2 Project Dependencies ***/
/* Middleware*/
// create instance of app for requiring body-parser
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { request, response } = require('express');
app.use(cors());


/*** CRITERIA.3 Local Server Setup ***/

// Setup Server
// Spin up the server: first we set the local server variables: port, hostname
const port = 8888;
const hostname = '127.0.0.1';
// then we add Callback function to debug by printing localhost server is running on terminal
function callbackDebug()
{
    console.log('HELLO! SERVER IS ONLINE!');
    console.log(`Server is running at http://${hostname}:${port}`);
}
// Activate listen method to start the server
app.listen(port, hostname, callbackDebug);


// Initialize all route with a callback function
/*** CRITERIA.7 Return Endpoint Data
GET Route I: Server Side ***/
// Callback function to complete GET '/all'
app.get('/all', (request, response) => {
    response.send(projectData);
    console.log(projectData);
});


// Post Route: to be able to add an entry to the project endpoint using a POST route setup on the server side and executed on the client side as an asynchronous function: the POST Route request the body.data for each entry in order to receive data, then all the collected data will be pushed to projectData
  app.post('/WeatherData', receiveData)
  function receiveData(request, response)  
  {
    /** MODIFIED:  map values in projectData object.  **/
    projectData.temp = request.body.temp
    projectData.date = request.body.date
    projectData.content = request.body.content

    console.log(projectData);

   }