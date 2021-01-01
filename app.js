const input = document.querySelector('.searchfield')
const search = document.getElementById('button1')
const frontbody = document.getElementById('frontcardbody')
const cityname = document.querySelector('.cityname')
const condition = document.getElementById('backcardbody')
const weatherdetails = document.querySelector('.weatherdetail')
const weathericon = document.getElementById('weathericon-main')
const lcard = document.getElementById('leftcard')
const rcard = document.getElementById('rightcard')
const lbox = document.getElementById('leftbox')
const rbox = document.getElementById('rightbox')
const convertemp = (kelvin) =>
{
    celcius = Math.round(kelvin -273.15)
    return celcius

}

mainicon = (icon) =>
{
    if(icon.includes('thunderstorm'))
    {
        weathericon.innerHTML = 
        `
        
            <div class="weatherimage" id="weathericon">
                <img src="img/thunder.svg" alt="" width="300"  height="300">

            </div>
        
        `
    }
 
    if(ico.includes('drizzle'))
    {
        weathericon.innerHTML = 
        `
        
            <div class="weatherimage" id="weathericon">
                <img src="img/rainy-1.svg" alt="" width="300"  height="300">

            </div>
        
        `
    }

    if(icon.includes('rain'))
    {
        weathericon.innerHTML = 
        `
        
            <div class="weatherimage" id="weathericon">
                <img src="img/rainy-6.svg" alt="" width="300"  height="300">

            </div>
        
        `
    }

    if(icon.includes('snow') || icon.includes('sleet'))
    {
        weathericon.innerHTML = 
        `
        
            <div class="weatherimage" id="weathericon">
                <img src="img/snowy-6.svg" alt="" width="300"  height="300">

            </div>
        
        `
    }

    if(icon.includes('clear'))
    {
        weathericon.innerHTML = 
        `
        
            <div class="weatherimage" id="weathericon">
                <img src="img/day.svg" alt="" width="300"  height="300">

            </div>
        
        `
    }

    if(icon.includes('clouds'))
    {
        weathericon.innerHTML = 
        `
        
            <div class="weatherimage" id="weathericon">
                <img src="img/cloudy.svg" alt="" width="300"  height="300">

            </div>
        
        `
    }

    if(icon.includes('mist')||icon.includes('haze')||icon.includes('fog'))
    {
        weathericon.innerHTML = 
        `
        
            <div class="weatherimage" id="weathericon">
                <img src="img/snowy-5.svg" height="300" width="300">
            </div>
        
        `
    }
}


function day()
{
    const d = new Date()
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    return days[d.getDay()]
}

function nday()
{
    const d = new Date()
    return [d.getDate()]
}

function date()
{
    const date = new Date()
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    return months[date.getMonth()]
}
function year()
{
    const y = new Date()
    return (y.getFullYear())
}

getime = (timezon) =>
{
    // time convertion from local to desired city
    const timezone = timezon //needs to be converted in minutes 
    const timezoneInMinutes = timezone / 60;
    const currTime = moment().utcOffset(timezoneInMinutes).format("h:mm A");
    return(currTime)
}

apiweather = citydata =>
{
    // console.log(citydata.name)
    cityname.innerHTML =
    `   <h3 class="heading1">
            <img src="img/loc.gif" alt="">${citydata.name}
            <sup><span class="badge badge-pill bg-warning">${citydata.sys.country}</sup>
        </h3>
        <span class="daynamee">${day()} ${nday()},</span>
        <span class="datee">${date()} ${year()}</span>
    `

    condition.innerHTML = 
    `
    
        <div class="card-mid row">
            <div class="col-8 temp">
                <span class="pdeg">${convertemp(citydata.main.temp)}&deg;C</span>
            </div>
            <div class="col-4 condition-temp">
                <p class="condition">${citydata.weather[0].description}</p>
                <p class="high">${convertemp(citydata.main.temp_max)}&deg;C</p>
                <p class="low">${convertemp(citydata.main.temp_min)}&deg;C</p>
            </div>
        </div>
    
    
    
    `

    weatherdetails.innerHTML = 

    `
    
        <h3 class="h5 precipitation mt-5">
            <i class="precpicon">
                <img src="img/weather.svg" alt="" height="43">
            </i>
            <span class="type1">FEELS LIKE: </span>
            <span class="value1">${convertemp(citydata.main.feels_like)}&deg;C</span>
        </h3>

        <h3 class="h5 humidity">
            <i class="humidicon">
                <img src="img/drop.svg" alt="" height="25">
            </i>
            <span class="type2">HUMIDITY: </span>
            <span class="value2">${citydata.main.humidity}%</span>
        </h3>
        <h3 class="h5 wind">
            <i class="windicon">
                <img src="img/wind.gif" alt="" height="25">
            </i>
            <span class="type3">WIND: </span>
            <span class="value3">${citydata.wind.speed}km/h</span>
        </h3>
    
    
    `
    mainicon(citydata.weather[0].description)


    frontbody.innerHTML = 

    ` 
        <i class="clock">
            <img src="img/icons8-clock.gif" alt="" width="30" height="30">
        </i>
        <span class="time mt-1">${getime(citydata.timezone)}</span>
        <hr class="bg-danger">
        <p class="text-center" id="rcardbody">HAVE A GREAT DAY!</p>
    
    `
    lcard.classList.remove('d-none')
    rcard.classList.remove('d-none')
    lbox.classList.remove('d-none')
    rbox.classList.remove('d-none')
}


search.addEventListener('click',(e)=>
{
    e.preventDefault()
    const city = input.value 
    request(city)
    .then((data) => 
    {
        apiweather(data)
    })
    .catch((err) => 
    {
        console.log(err)
    })
})

