
let button = document.querySelector('.btn')
let inputValue = document.querySelector('.form-control')
let city = document.querySelector('.city');
let country= document.querySelector('.country');
let temp = document.querySelector('.temp');
const apiKey= 'eaec304f0761b61ea7d76d33b9f1c81f';
button.addEventListener('click', function(){
    document.getElementById('error').style = 'display:none';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=${apiKey}`
    )
        .then(response => response.json())
        .then(data => {
            
            let cityValue = data.name;
            let countryValue = data.sys.country;
            let tempValue = data.weather[0].description;
            city.innerHTML = cityValue;
            country.innerHTML = countryValue;
            temp.innerHTML = tempValue;
            let lat = data.coord.lat;
            let long = data.coord.lon;
            console.log(lat,long);
                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`)
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('w-info').style = 'display:flex';
                        document.getElementById('title').style = 'display:flex';
                        let days = data.daily;
                        let table = document.getElementById('forecast');
                            table.textContent = '';
                        for (let i = 0; i < days.length; i++){
                            let minValue = days[i].temp.min;
                            let maxValue = days[i].temp.max;
                            let iconValue = days[i].weather[0].icon;
                            let row = `<tr>
                                        <td>${i}</td>
                                        <td>${days[i].temp.min}</td>
                                        <td>${days[i].temp.max}</td>
                                        <td><img src="http://openweathermap.org/img/wn/${days[i].weather[0].icon}.png"></img></td>
                                       </tr>`
                            table.innerHTML += row 
                        
                        }
                        
                })
    })
.catch((err) => {
    document.getElementById('error').innerHTML = "City not found";
    document.getElementById('error').style = 'display:block';
    document.getElementById('w-info').style = 'display:none';
    document.getElementById('title').style = 'display:none';

    }

)
});


