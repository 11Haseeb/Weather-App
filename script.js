const inputField = document.querySelector("input");
const button = document.querySelector("button");
const weatherDataCard = document.querySelector(".weather-data");
const errorMsg = document.querySelector(".error-msg");
const credits = document.querySelector(".credits")

const weatherApp = () => {
    let locationName = inputField.value.toLowerCase().trim();
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=83a25a98c69631bf1580fd057506fff0&units=metric`;

    const fetchWeatherData = async () => {
        try{
            const response = await fetch(URL);
            if(!response.ok){
                throw new Error("No Location Found!");
            }
            const data = await response.json();

            weatherDataCard.innerHTML = `
            <h2 class="city-name">${data.name}</h2>
            <h3 class="main">${data.weather[0].main}</h3>
            <h3 class="description">${data.weather[0].description}</h3>
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
            <h2 class="temperature">${data.main.temp}°C</h2>
            <div class="min-max">
                <div class="min">
                    <span>min</span>
                    <p class="min-temp">${data.main.temp_min}°C</p>
                </div>
                <div class="max">
                    <span>max</span>
                    <p class="max-temp">${data.main.temp_max}°C</p>
                </div>
            </div>          
            `;
            
            setTimeout(()=>{
                credits.style.opacity = "1";
            }, 3000);

            weatherDataCard.style.display = "block";
            errorMsg.style.display = "none";
        }catch(error){
            if(inputField.value == ""){
                weatherDataCard.style.display = "none";
                errorMsg.innerHTML = "Please enter location name!";
                errorMsg.style.display = "block";
            }else{
                weatherDataCard.style.display = "none";
                errorMsg.innerHTML = error.message;
                errorMsg.style.display = "block";
            }
        }
    }
    fetchWeatherData();
}

button.addEventListener("click", e => {
    e.preventDefault();
    weatherApp();
});