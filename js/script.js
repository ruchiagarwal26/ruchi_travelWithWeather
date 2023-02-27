let currentData = "";
containerCity = document.getElementsByClassName("text-white");
savedSearch = document.getElementsByClassName("historyCity");

const todayDate = new Date();
const dateSixDays = todayDate.setDate(todayDate.getDate() + 6);

const newName = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
localStorage.setItem("City: ", newName.value);

function updateWeather(fetchedData, cityWeather) {
    let data = fetchedData;
    document.getElementById("city").innerHTML = cityWeather ?? newName.value.toUpperCase();
    if(!data) {
    console.log("cityWeather: ", cityWeather);
    data = JSON.parse(localStorage.getItem(cityWeather.toLowerCase()));
   // return;
}
    console.log(data);
  var daily = "";
  var dateDisplay = todayDate;
  //document.getElementById("city").innerHTML = newName.value.toUpperCase();
  for (i = 0; i < 42; i = i + 8) {
    if (i == 40) {
      var i = 39;
    }
    var result = dateDisplay.setDate(dateDisplay.getDate() + 1);
    var IncrementDayPartString = new Date(result).toString();
    var IncrementDayPart = IncrementDayPartString.slice(3, 15);
    var displayDateTimeSting = new Date(data.list[i].dt * 1000).toString();
    var displayDateTime = displayDateTimeSting.slice(3, 15);
    var day = displayDateTimeSting.slice(0, 3);
    dateDisplay.setDate(dateDisplay.getDate() + 1);

    // if (IncrementDayPart = displayDateTime & IncrementDayPart < todayDate.getDate() + 6 ) {
    //i=0;
    var windSpeed = data.list[i].wind.speed + " MPH ";
    //273.15) × 9/5 + 32 -- kelvin to Fahrenheit conversion
    var temp =
      ((Number(data.list[i].main.temp - 273.15) * 9) / 5 + 32).toFixed(1) +
      " °F";
    var humidity = data.list[i].main.humidity + " %";
    var date = data.list[i].dt_txt;
    var weatherIcon = data.list[i].weather[0].icon;
    var img = document.createElement("img");

    //console.log("weather", weatherIcon)
    document.getElementById("day" + i).innerHTML = "Day: " + day;
    document.getElementById("date" + i).innerHTML = "Date: " + displayDateTime;
    document.getElementById("day" + i + "Temp").innerHTML = "Temp: " + temp;
    document.getElementById("day" + i + "humidity").innerHTML =
      "Humidity: " + humidity;
    document.getElementById("day" + i + "wind").innerHTML =
      "windspeed: " + windSpeed;

    localStorage.setItem(day, document.getElementById("day" + i).innerHTML);
    localStorage.setItem(
      day + " date",
      document.getElementById("date" + i).innerHTML
    );
    localStorage.setItem(
      day + " Temp",
      document.getElementById("day" + i + "Temp").innerHTML
    );
    localStorage.setItem(
      day + " humidity",
      document.getElementById("day" + i + "humidity").innerHTML
    );
    localStorage.setItem(
      day + " wind",
      document.getElementById("day" + i + "wind").innerHTML
    );

    // "http://openweathermap.org/img/wn/"+ weatherIcon+".png";
    var src = document.getElementById("img" + i);
    img.src = "http://openweathermap.org/img/wn/" + weatherIcon + ".png";
    //to clear earlier image
    document.getElementById("img" + i).innerHTML = "";
    //append images
    src.appendChild(img);
  }
}

function getCityName() {
  var city = newName.value;
  urlCity =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&appid=81f8a86d10c6f817f15d7e4e551616ef";

  fetch(urlCity) //for getting lon and lat
    .then(function (response) {
      //checking the returned promise if it is ok
      console.log("response ", response);
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.length; i++) {
        var lon = data[i].lon;
        var lat = data[i].lat;
        console.log(" lon ", lon);
        console.log(" lat ", lat);
        lon.innerHTML = lon;
        var weatherUrl =
          "https://api.openweathermap.org/data/2.5/forecast?lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=81f8a86d10c6f817f15d7e4e551616ef";
        //return url;
      }
      fetch(weatherUrl)
        .then(function (response) {
          console.log("weatherURL ", response);
          if (!response.ok) {
            throw new Error("Network response for Weather App was not ok");
          }
          return response.json();
        })

        .then(function (data) {
          //currentData = JSON.stringify(data);
          localStorage.setItem(city, JSON.stringify(data));
          console.log("hello");
          updateWeather(data);
        });
    });
}

var saved_city = localStorage.getItem("City: ");
var saved_date = localStorage.getItem("day");

//to save search history and display on the page

function searchHistory() {
  const recentSearch = [];
  recentSearch.push(newName.value.toUpperCase());
 // console.log("recentSearch: " + recentSearch);
  var dataExist = localStorage.getItem(newName.value);
  console.log("dataExist : ", dataExist);
  if (dataExist) {
  for (j = 0; j < recentSearch.length; j++) {
    const BUTTON = document.createElement("BUTTON");
    
    BUTTON.setAttribute("type", "submit");
    BUTTON.setAttribute("class", "historyCity");
    BUTTON.setAttribute("id", recentSearch[j]);
    BUTTON.setAttribute("value", recentSearch[j]);
    //BUTTON.setAttribute("onclick" ,updateWeather(savedWeather));
    console.log(recentSearch[j]);
    BUTTON.addEventListener("click", () => {updateWeather(undefined, recentSearch[0])});
    BUTTON.innerHTML = recentSearch[j];
    document.getElementById("history").append(BUTTON);
  }
}
}