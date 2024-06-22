   var today = document.getElementById('today');
   var countryName = document.getElementById('countryName');
   var currentDayCondtion = document.getElementById('currentDayCondtion');
   var state = document.querySelectorAll(".custom")
   var num = document.querySelector(".num");
   var search = document.querySelector(".search");
   var dgreeApi = document.querySelectorAll(".dgreeApi");
   var headApi = document.querySelectorAll(".headApi");
   console.log(headApi);
   console.log(dgreeApi);
   search.addEventListener("input", function(e) {
    getApi(e.target.value);
  });
    var myRequest = new XMLHttpRequest() ;
   
var alldetails = [];
var days = [];

async function getApi(key) {
  var cartoona = "";

  try {
      var res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=23824e0d656346d3bbd144600232712&q=${key}&days=7`);
    if (!res.ok) {
      throw new Error(`Weather API request failed with status: ${res.status}`);
    }

    var alldetails = await res.json();
    console.log(alldetails);
    currentWeahter = alldetails.current .condition.icon;
    days = alldetails.forecast.forecastday[0].date;

    cartoona += `
      <div class="day text-light">${getDayName(days)}</div>
      <div class="date text-light">${formatDateWithoutYear(days)}</div>
    `;
     getDayName(alldetails.forecast.forecastday[1].date)
    today.innerHTML = cartoona;
    countryName.innerHTML = alldetails.location.name;
    currentDayCondtion.setAttribute('src', `http:${currentWeahter}`);
    state[0].innerHTML = alldetails.current.condition.text;
    num.innerHTML = `${alldetails.current.temp_c}<sup>o</sup>C`;
     headApi[0].innerHTML = 
    `
    <div class="day text-light">${getDayName(alldetails.forecast.forecastday[1].date)}</div>
 
    `
    headApi[1].innerHTML = 
    `
    <div class="day text-light">${getDayName(alldetails.forecast.forecastday[2].date)}</div>

    ` 
    dgreeApi[0].innerHTML = 
    ` 
    <div class="forecast-icon mb-4">
    <img src="https:${alldetails.forecast.forecastday[1].day.condition.icon}" alt="" width="48" />
</div>
<div class="degree text-light">${alldetails.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</div>
<small class="text-light">${alldetails.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></small>
<div class="custom">${alldetails.forecast.forecastday[1].day.condition.text}</div>
    
    ` 

    dgreeApi[1].innerHTML = 
` 
 <div class="forecast-icon mb-4">
 <img src="https:${alldetails.forecast.forecastday[2].day.condition.icon}" alt="" width="48" />
</div>
<div class="degree text-light">${alldetails.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</div>
<small class="text-light">${alldetails.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></small>
<div class="custom">${alldetails.forecast.forecastday[2].day.condition.text}</div>
    
` 

    

    




  } catch (error) {
    // Handle the error when the key is not found
    console.error(error);

    // Update the UI with a message or set default values
    today.innerHTML = "<div class=' text-light error-message'>Weather information not available</div>";
    countryName.innerHTML = "Unknown Location";
    currentDayCondtion.setAttribute('src', ''); // Provide a placeholder image URL
    state[0].innerHTML = "N/A";
    num.innerHTML = "N/A";
    dgreeApi[0].innerHTML = ` <div class=" text-light NA"> <h1>N/A</h1> </div> `
    dgreeApi[1].innerHTML = ` <div class=" text-light NA"> <h1>N/A</h1> </div> `

 
  }
}

  getApi("cairo");

  function getDayName(dateString) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    
    return daysOfWeek[dayIndex];
  }
  
  function formatDateWithoutYear(inputDateString) {
    const inputDate = new Date(inputDateString);
    
    const day = inputDate.getDate();
    const month = inputDate.toLocaleString('default', { month: 'long' });
    
    return `${day}${month}`;
  }