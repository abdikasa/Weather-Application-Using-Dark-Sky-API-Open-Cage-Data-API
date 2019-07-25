//DOMContentLoaded
document.addEventListener("DOMContentLoaded", getWeather);

//modal change button
document.getElementById('w-change-btn').addEventListener('click', () => {

    //Get the values from the user input
    const lat = document.getElementById('lat');
    const long = document.getElementById('long');

    //check for errors

    if ((long.value > -180), (long.value < 180), (lat.value > -90), (lat.value < 90), lat.value.trim() !== '', long.value.trim() !== '') {
        borderColorUI('lightgray');
        //Change the location.
        weather.changeLocation(lat.value, long.value);
        lStorage.setLocation(lat.value, long.value);

        //Call the API with the new added long and latitudes.
        //Close the modal and clear the values inputted.
        getWeather();
        $('#locModal').modal('hide');
        lat.value = ''; long.value = '';
    } else {
        lat.value = ''; long.value = '';
        borderColorUI('red');
    }

})

function borderColorUI(color) {
    lat.style.borderColor = color;
    long.style.borderColor = color;
}


//Create weather object, ui, storage set up.
const lStorage = new LocalStorage();
//const weatherStorage = lStorage.getLocation();

const weather = new Weather(lStorage.getLocation().lat, lStorage.getLocation().long);
console.log(lStorage.getLocation().lat, lStorage.getLocation().long);
const ui = new UI();


function getWeather() {
    weather.getWeather()
        .then(weather => {
            console.log(weather.result);
            console.log(weather.ocdResult);
            ui.paintUI(weather);
        })
        .catch(err => console.warn(err))
}
