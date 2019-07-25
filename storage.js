

class LocalStorage {
    constructor() {
        this.lat;
        this.long;
        this.defaultLat = '43.6532';
        this.defaultLong = '-79.3832';
    }

    getLocation() {
        //Get the values form LS
        if (localStorage.getItem('lat') === null) {
            this.lat = this.defaultLat;
        } else {
            this.lat = localStorage.getItem('lat');
        }

        if (localStorage.getItem('long') === null) {
            this.long = this.defaultLong;
        } else {
            this.long = localStorage.getItem('long');
        }

        return {
            lat: this.lat,
            long: this.long
        }
    }

    setLocation(newLat, newLong) {
        //Set locations inside LS.
        localStorage.setItem('lat', newLat);
        localStorage.setItem('long', newLong);
    }
}


