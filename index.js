const weatherfor=document.querySelector(".weather");
const city=document.querySelector(".city");
const card=document.querySelector(".card");
const apikey="7ecb94f89d5a0b2d0259dd038809c230";
const unsplashapikey = "pKFXgXX52tJMADwSVxi_ErzGfrE46f8I2ydQEBLxr78";

weatherfor.addEventListener("submit",async (e)=>{
     e.preventDefault();
        const cityvalue=city.value;
        if(cityvalue){
            try{
              const weatherdata = await getweather(cityvalue);
              const images = await getcityimage(cityvalue);
              startslideshow(images);
              displayweather(weatherdata);
            }
            catch(error){
                console.error(error);
                displayerror("An error occurred while fetching the weather data. Please try again later.");
            }

        }
        else{
            displayerror("Please enter the city name");
        }
        
});
async function getweather(city){
     
    const apiresponse=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
    const response=await fetch(apiresponse);
    console.log(response.status);  
    if(!response.ok){
        throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    console.log(data);  
    return data;
}

function displayweather(data){
    const {name : city , 
           main:{temp, humidity},
           weather: [{description, id}]}=data;
    card.textContent=" ";
    card.style.display="flex";
    const citydisplay=document.createElement("h1");
    const tempdisplay=document.createElement("p");
    const humiditydisplay=document.createElement("p");
    const descript=document.createElement("p");
    const weatheremoji=document.createElement("p");
    citydisplay.textContent=city;
    citydisplay.classList.add("citydis");
    card.appendChild(citydisplay);
    tempdisplay.textContent=`${Math.round(temp-273.15).toFixed(1)}°C`;
    tempdisplay.classList.add("tempdisplay");
    card.appendChild(tempdisplay);
    humiditydisplay.textContent=`Humidity : ${humidity}%`;
    humiditydisplay.classList.add("Humidity");
    card.appendChild(humiditydisplay);
    descript.textContent=description;
    descript.classList.add("descript");
    card.appendChild(descript);
    weatheremoji.textContent=getweatheremoji(id);
    weatheremoji.classList.add("Wemoji");
    card.appendChild(weatheremoji);
}
function getweatheremoji(weatherid){
    switch(true){
        case weatherid>=200 && weatherid<300:
            return "⛈️";
        case weatherid>=300 && weatherid<400:
            return "🌧️";
        case weatherid>=500 && weatherid<600:
            return "🌦️";
        case weatherid>=600 && weatherid<700:
            return "❄️";
        case weatherid>=700 && weatherid<800:
            return "🌫️";
        case weatherid===800:
            return "☀️";
        case weatherid>800 && weatherid<900:
            return "☁️";
        default:
            return "❓";
    }
}
function displayerror(message){
    const errord=document.createElement("p");
    errord.textContent=message;
    errord.classList.add("erorcity");
    card.textContent=" ";
    card.style.display="flex";
    card.appendChild(errord);
}
async function getcityimage(city){
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashapikey}&per_page=5`);
    const data = await response.json();
    return data.results.map(img => img.urls.regular);
}
let slideshowinterval;
function startslideshow(images){
    clearInterval(slideshowinterval);
    let index = 0;
    document.body.style.backgroundImage = `url(${images[0]})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    slideshowinterval = setInterval(()=>{
        index = (index + 1) % images.length;
        document.body.style.backgroundImage = `url(${images[index]})`;
    }, 10000);
}