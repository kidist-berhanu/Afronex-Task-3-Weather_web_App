
const Key ="3c13867a590b54fd8a73772048323027";
const Url ="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const cityName = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherCondition = document.querySelector(".weather-condition");

async function checkWeather(city){
    const result = await fetch(Url + city + `&appid=${Key}`);

    if(result.status == 404){
        document.querySelector(".invalid").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
        var data = await result.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temprature").innerHTML =Math.round(data.main.temp)  + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        switch(data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "images/cloudy.svg";
                weatherCondition.textContent = "Cloudy";
                break;
            case "Clear":
                weatherIcon.src = "images/day.svg";
                weatherCondition.textContent = "Clear";
                break;
            case "Rain":
                weatherIcon.src = "images/rainy.svg";
                weatherCondition.textContent = "Rainny";
                break;
            case "Drizzle":
                weatherIcon.src = "images/drizzle.png";
                weatherCondition.textContent = "Drizzle";
                break;
            case "Mist":
                weatherIcon.src = "images/mist.png";
                weatherCondition.textContent = "Mist";
                break;
            default:
                break;
        }        

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".invalid").style.display = "none";
    }
}
/* When search button is clicked*/
searchBtn.addEventListener("click", function() {
    if (cityName.value.trim() === "") {
        const noInput =  document.querySelector(".invalid");
        noInput.textContent = "Please enter city name.";
        document.querySelector(".invalid").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        checkWeather(cityName.value);
    }
});
/* When enter is pressed*/
cityName.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        if (cityName.value.trim() === "") {
            const noInput = document.querySelector(".invalid");
            noInput.textContent = "Please enter city name.";
            document.querySelector(".invalid").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            checkWeather(cityName.value);
        }
    }
});