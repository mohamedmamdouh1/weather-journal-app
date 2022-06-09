/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let getMonthCorrection = d.getMonth()+1; //fix month starting value to be 1 instead of 0
let getDate = d.getDate();
let getYear = d.getFullYear();

const newDate = getMonthCorrection + '.' + getDate + '.' + getYear;
/*** CRITERIA.4 & 6: API Credentials ***/
// Personal API Key for OpenWeatherMap API
const personalKey = ',us&appid=328e55744ef943240b1014738738ea2c&units=metric';
// Declare unit as metric for temperature to by displayed in celsius.

/*** CRITERIA.10: Naming HTML Inputs and Buttons For Interaction ***/
// Select existing HTML DOM element: generate to apply event listener on the button
const selectButton = document.getElementById('generate');

/*** CRITERIA.12: Event Listeners ***/
// Apply Event listener method to add function to existing HTML DOM element
selectButton.addEventListener('click', responder);
/* Function called by event listener */
function responder(event) {
    /*** CRITERIA.10: Naming HTML Inputs and Buttons For Interaction ***/
    // select existing HTML DOM element: zip and extract its numerical value from user to return the temperature data for required location
     const zipCode = document.getElementById('zip').value;
     /** MODIFIED: fault tolerant checks for input zip values addressed as Suggested by the Reviewer **/
        if (!zipCode)  { 
            alert("ZIP Code is missing, enter valid zip Code and Try Again")
            return  }
        else if (zipCode.length > 5) {
            alert("Too Long, Valid ZIP Code is 5-digit code, Please Try Again")
            return }
        else if (zipCode.length < 5) {
            alert("Too Short, Valid ZIP Code is 5-digit code, Please Try Again")
            return }
        else if (isNaN(zipCode)) {
            alert("Valid ZIP Code is 5-digit code of numbers only, Please Try Again")
            return }
     // select existing HTML DOM element: feelings and extract its value from the user to be displayed
    const content = document.getElementById('feelings').value;

    // declare the API base URL to be fetched with template literal to replace value of zipCode
    const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=`;

    // Call getTemperature function to fetch the Web API Data
    getTemperature(baseURL, zipCode, personalKey)
    .then(function(data){
    // Call postData function to inject the output data (temp, date, feelings) to POST Route   
    postData('/WeatherData', {temp:data.main.temp, date:newDate, content:content})
    })
    .then(function(){
    //Call updateUI function after posting all the data and getting it to the server to
    // add the elements dynamically in HTML file     
        updateUI()
    })
}


/* Function to get Web API Data*/
/** MODIFIED: arrow function instead of traditional one **/
const getTemperature = async (baseURL, zipCode, personalKey) => {
    /*** CRITERIA.6: Integrating OpenWeatherMap API ***/
    // fetch data from Weather APP API
    const response = await fetch(baseURL+zipCode+personalKey);
    try {
        const result = await response.json();
        const temp = result.main.temp;
        const City = result.name;
    // Testing the API by printing the following phrase, city is extracted from the API    
        console.log(`Temperature at ${City} = ${temp} °C`); 
        return result;
    } // Error Handler    
        catch(error) {
            console.log("ERROR!",error); }
}
/*** CRITERIA.9 POST Route:  Client Side, the post data function: 2 arguments:
 * the url to the Post Route /WeatherData, and the data passed to function ***/
/** MODIFIED: arrow function instead of traditional one **/
 const postData = async ( url = '', data = {}) => {
{
    const response = await fetch( url, {
    method: 'POST',
    credentials: 'same-origin',      // app.js will be registered on same browser (default value)
    headers: {'Content-Type': 'application/json'},   // JSON data format
    body: JSON.stringify(data),      // body of POST request transformed to JSON string data from object data
    });

    try {
        const result = await response.json();
        console.log(result);
        return result
    }    // Error Handler     
    catch(error) {
         console.log("ERROR DETECTED!",error);
          }
}  

}
/***CRITERIA.13 Dynamically Update UI: by setting the properties of existing HTML elements from the DOM using JS included in the async function to retrieve that app’s data on the client side, existing DOM elements should have their innerHTML properties dynamically ***/
/** MODIFIED: arrow function instead of traditional one **/
const updateUI = async () => {
    const response = await fetch('/all');
    try {
     const allData = await response.json();
   /***CRITERIA.11: Assigning Element Properties Dynamically ***/ 
   /** MODIFIED: rendering method on object instead of Array **/
     document.getElementById("date").innerHTML = allData.date;
     document.getElementById("temp").innerHTML = allData.temp;
     document.getElementById("content").innerHTML = allData.content;
   }catch(error){
    console.log("ERROR DETECTED!",error);
}
  }

  