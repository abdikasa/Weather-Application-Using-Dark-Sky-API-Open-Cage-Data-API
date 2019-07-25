
// Build an UI Class that will output data on the screen
//Constructor will take no arguments but contains the DOM elements.

class UI {
    constructor() {
        this.location = document.getElementById('w-location');
        this.desc = document.getElementById('w-desc');
        // this.string = document.getElementById('w-string');
        this.high_low = document.querySelector('.high-low');
        this.hrlydsc = document.querySelector('.hrly-desc')
        this.icon = document.getElementById('w-icon');
        this.humidity = document.getElementById('w-humidity');
        this.feelsLike = document.getElementById('w-feelslike');
        this.precip = document.getElementById('w-precip');
        this.wind = document.getElementById('w-wind');
        this.timeandDate = document.querySelector('.time-date')
        this.images = ['https://cdn0.iconfinder.com/data/icons/large-weather-icons/512/Night.png', 'https://cdn0.iconfinder.com/data/icons/large-weather-icons/512/Cloudy_day.png', 'https://cdn0.iconfinder.com/data/icons/large-weather-icons/512/Heavy_sleet.png', 'https://cdn0.iconfinder.com/data/icons/large-weather-icons/512/Day.png', 'https://cdn0.iconfinder.com/data/icons/large-weather-icons/512/Rain.png', 'https://cdn0.iconfinder.com/data/icons/large-weather-icons/512/Thunder.png']
        //night, cloudy day, snow, sunny, rain, thunder  
    }

    //As the name suggests, the screen will be painted with the data passed.
    paintUI(weatherObj) {
        const time = this.convertUnix(weatherObj.result.currently.time);
    
        let place = `${weatherObj.ocdResult.results[0]["components"]["city"] || weatherObj.ocdResult.results[0]["components"]["village"] || weatherObj.ocdResult.results[0]["components"]["county"]}`
        let afterComma = `${weatherObj.ocdResult.results[0]["components"]["state_code"] || weatherObj.ocdResult.results[0]['formatted'] || weatherObj.ocdResult.results[0]["components"]["country_code"]}`

        if (typeof place === 'undefined' || place === 'undefined') {
            this.location.textContent = `${afterComma}`;
        }else{
            this.location.textContent = `${place}, ${afterComma}`;
        }

        this.desc.innerHTML = `${weatherObj.result.currently.summary}<br>${weatherObj.result.currently.temperature}˚F (${parseInt(this.convertFToC(weatherObj.result.currently.temperature))}˚C)`;


        this.high_low.innerHTML = `<span style="font-weight-bold">Feels like:</span> ${parseInt(this.convertFToC(weatherObj.result.currently.apparentTemperature))}˚ <span style="font-weight-bold">Low:</span> ${parseInt(this.convertFToC(weatherObj.result.daily.data[0].temperatureLow))}˚ <span style="font-weight-bold">High:</span> ${parseInt(this.convertFToC(weatherObj.result.daily.data[0].temperatureHigh))}˚`
        this.hrlydsc.textContent = `${weatherObj.result.daily.summary}`;
        this.icon.setAttribute('src', this.changeWeather(weatherObj.result.currently.icon, time[2]));
        this.humidity.textContent = `Relative Humidity: ${parseInt(weatherObj.result.currently.humidity * 100)}%`
        this.feelsLike.textContent = `Feels like: ${parseInt(this.convertFToC(weatherObj.result.currently.apparentTemperature))}˚C`
        this.precip.textContent = `Rain probability: ${(weatherObj.result.daily.data[0].precipProbability * 10).toFixed(2)}%`
        this.wind.textContent = `Wind: ${Math.ceil(weatherObj.result.currently.windGust)}kph`;
        this.timeandDate.innerHTML = `<div class="col-md-6">${time[1]} ${time[0]}</div>
        <div class="col-md-6">Last updated at ${time[2]}</div>`
    }

    //Displays the corresponding weather image.
    changeWeather(string, time) {
        let s = string.toLowerCase();
        let gallery = this.images;
        let selected;
        let timemgmt = time.split(":");
        let utility = [[10, 11, 12], [1, 2, 3, 4, 5]]
        let night = ((utility[0].indexOf(Number(timemgmt[0])) > 0) && ("PM".indexOf(timemgmt[1].slice(timemgmt[1].length - 2)) > 0)) || ((utility[1].indexOf(Number(timemgmt[0])) > 0) && ("AM".indexOf(timemgmt[1].slice(timemgmt[1].length - 2)) > 0));

        if ((s.indexOf("clear") >= 0) && night) {
            selected = gallery[0];
        } else if ((s.indexOf("clear") >= 0) && !night) {
            selected = gallery[3];
        } else if (s.indexOf("snow" || "hail") >= 0) {
            selected = gallery[2];
        } else if (s.indexOf("cloud" || "overcast") >= 0) {
            selected = gallery[1];
        } else if (s.indexOf("thunderstorm") >= 0) {
            selected = gallery[5];
        } else if (s.indexOf("rain" || "drizzle") >= 0) {
            selected = gallery[4];
        }
        return selected;
    }

    //Convert Fahrenheit to Celcius
    convertFToC(num) {
        return (num - 32) * 5 / 9;
    }

    //Converts unix timestamp to properly formatted date and time. 
    convertUnix(t) {
        var d = new Date(t * 1000);
        let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        let date = `${month[(d.getMonth())]}, ${d.getDate()} ${d.getFullYear()}`;

        let twelvehr = d.toLocaleTimeString();
        twelvehr = twelvehr.split(':');

        let finalTime = `${twelvehr[0]}:${twelvehr[1]} ${twelvehr[2].slice(twelvehr.length - 1)}`

        let selectedDay = day[d.getDay()];
        console.log(date, selectedDay, finalTime);

        return [date, selectedDay, finalTime];
    }
}

