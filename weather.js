

const apikey =  '276d3425c274128d510af370b70dfb82'



// request website for weather details

const request = async(city) =>
{
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`

    // make fetch request

    const res = await fetch(url)

    //response

    const data = await res.json()
    return data
}

