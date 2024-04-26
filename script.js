
const Key ="3c13867a590b54fd8a73772048323027";
const Url ="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const cityName = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

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
                weatherIcon.src = "images/clouds.png";
                break;
            case "Clear":
                weatherIcon.src = "images/day.svg";
                break;
            case "Rain":
                weatherIcon.src = "images/rainy.svg";
                break;
            case "Drizzle":
                weatherIcon.src = "images/drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "images/mist.png";
                break;
            default:
                break;
        }        

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".invalid").style.display = "none";
    }
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(cityName.value);
})

