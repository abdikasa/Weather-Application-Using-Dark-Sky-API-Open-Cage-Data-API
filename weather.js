class Weather {
    constructor(latitude, longitude) {
        // this.key = 'spirited, ';
        this.latitude = latitude;
        this.longitude = longitude;
        // this.ocdkey = 'away'
        this.key = 'key was here ';
        this.ocdkey = 'key was here'
    }

    /*
    Problem: Ran into  something called cors error, the link inside the console outputs the link to the specified data, however, two errors prevent anything from being displayed on the console. Apparently, the DarkSky API that only allows sepcific domains to have access.
    Solution: Found the exact problem, if I add cors-anywhere.herokuapp.com, the console now displays the code I specified. Hooray.
    */

    async getWeather() {
        const response = await fetch(`http://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${this.key}/${this.latitude},${this.longitude}`)
        const result = await response.json();

        const ocd = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=${this.ocdkey}&q=${this.latitude}%2C${this.longitude}&language=en`)
        const ocdResult = await ocd.json();

        return {
            result,
            ocdResult,
        }
    }

    changeLocation(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}