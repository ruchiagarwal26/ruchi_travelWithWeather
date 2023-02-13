
containerCity = document.getElementsByClassName('text-white');

urlCity = 'https://api.openweathermap.org/geo/1.0/direct?q=Fair%20Lawn&appid=81f8a86d10c6f817f15d7e4e551616ef'

function getAPI () {

    var lon;
    var lat;
    var url = '';

fetch(urlCity)
    .then(function (response) {
        console.log("response ", response);
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        return response.json();
    })
    .then(function (data) {
        console.log("data ", data);

        for (var i =0; i < data.length; i++){
            var lon = data[i].lon;
            var lat = data[i].lat;
            console.log(" lon ", lon);
            console.log( " lat ", lat);   
            lon.innerHTML = lon;
            url.append('https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid=81f8a86d10c6f817f15d7e4e551616ef')
        }
    });
    

    console.log ('url =', url);
}

getAPI();