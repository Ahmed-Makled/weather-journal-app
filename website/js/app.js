/* Global Variables */
let generate = document.querySelector("#generate");
let appContainer = document.querySelector("#app");

// creat a heigh of app container Equal heigh of window
let winH = window.innerHeight;
appContainer.style.height = `${winH}px`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toLocaleString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

/* WEB API WITH FETCH DEMO--  */
let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = "&appid=dbf6ca91b4b76dd9987ca08b3cb5a0be";

/*Add Event */
document.getElementById("generate").addEventListener("click", performAction);

/**
@description Creat Function performAction
@param e
@return PreventDefult , callback fucution getWeaher
*/
function performAction(e) {
  e.preventDefault(); // preventDefault Event Click
  const feelings = document.querySelector("#feelings").value;
  const newZip = document.querySelector("#zip").value;
  // console.log(`The New Date is ${newDate}`);
  // console.log("************************************************************");
  getWeather(baseURL, newZip, apiKey) // callback Funcution getWeather
    .then(function (data) {
      // send data To server
      // console.log(`The Data Send To Server Is:`);
      // console.log(data);
      // console.log(
      //   "************************************************************"
      // );

      postData("/add", {
        date: newDate,
        temp: (data.main.temp - 273).toFixed(2),
        content: feelings,
      }); //Callback Function postData and add data
      updateUI();
    });
}

/**
@description  creat varibal getWeather equal asnc function 
@param apiUrl , newZip , apikey
@return get web api data 
*/

const getWeather = async (baseURL, newZip, apiKey) => {
  const res = await fetch(baseURL + newZip + apiKey);
  // console.log(`the response of get wearther :`);
  // console.log(res);
  // console.log("************************************************************");

  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error); //  handle the error
    // console.log("************************************************************");
  }
};

/** 
@description creat varibal postData equal asnc function 
@param url data =function
*/

const postData = async (url = "", data = {}) => {
  // console.log(`the Post Data is: `);
  // console.log(data);
  // console.log("************************************************************");

  // response returns a promise
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify(data), //match "Content-Type"
  });

  // try {
  //   const newData = await res.json();
  //   console.log(`The New Data is : `);
  //   console.log(newData);
  //   return newData;
  // } catch (error) {
  //   console.log("error", error); //  handle the error
  //   // console.log("************************************************************");
  // }
};

/**
 @description creat varibal updateUI equal asnc function 
 */

const updateUI = async () => {
  const res = await fetch("/all");
  // console.log(`the response of UpdateUI is : `);
  // console.log(res);
  // console.log("************************************************************");

  // try {
  const allData = await res.json();
  document.getElementById("date").innerHTML = allData.date;
  document.getElementById("temp").innerHTML = `${allData.temp}&deg;C`;
  document.getElementById("content").innerHTML = allData.content;
  // } catch (error) {
  //   console.log("error", error); //  handle the error
  //   // console.log("************************************************************");
  // }
};
