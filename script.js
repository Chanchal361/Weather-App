const userTab = document.querySelector("[YourWeather]");
const searchTab = document.querySelector('[SearchWeather]');
const userContainer = document.querySelector('.weather-container');
const grandLocation = document.querySelector('.grand-location');
const dataSearch = document.querySelector("[dataSearch]");
const loading = document.querySelector(".loading");
const weatherInfo = document.querySelector(".weather-information");



let oldTab = userTab;
const API_KEY = "d7bebe631b405c3fcb9bbe7e85d3d15b";
oldTab.classList.add("current-tab");
getFromSessionstirage();
function switchTab(newTab) {
    if (newTab != oldTab) {
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab")


        if (!dataSearch.classList.contains("active")) {
            weatherInfo.classList.remove("active");
            grandLocation.classList.remove("active");
            dataSearch.classList.add("active");
        }else{
            dataSearch.classList.remove("active");
            weatherInfo.classList.remove("active");
            getFromSessionstirage();
        }
    }
}


function getFromSessionstirage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if (!localCoordinates) {
        grandLocation.classList.add("active");
    } else {
        const coordinates = JSON.parse(localCoordinates)
        fetchUserWeatherInfo(coordinates)
    }
}
userTab.addEventListener("click",()=>{
    switchTab(userTab)
})
searchTab.addEventListener("click",()=>{
    switchTab(searchTab)
})

//  async function fetchUserWeatherInfo(coordinates){
//     const {lat,lon}=coordinates;
//     grandLocation.classList.remove("active");
//     loading.classList.add("active");

//     try{
//         const response=await fetch(
            
//             `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
//         );
//         const data=await response.json();
//         loading.classList.remove("active");
//         weatherInfo.classList.add("active");
//         renderWeather(data);
//     }catch(err){
//         loading.classList.remove("active");
//         console.log(err)
//     }

//  }
  
///another ways 

 function fetchUserWeatherInfo(coordinates){
     const {lat,lon}=coordinates;
     grandLocation.classList.remove("active");
     loading.classList.add("active");
     fetch(
            
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(response=> response.json())
    .then((data)=>{
        loading.classList.remove("active");
        weatherInfo.classList.add("active");
        renderWeather(data);
    })
    .catch((e)=>{
        alert(e)
    })

 }

 function renderWeather(weatherI){
    const CityName=document.querySelector('[cityName]');
    const CountryIcon=document.querySelector('[countryImg]');
    const dsec=document.querySelector('[WeatherDesc]');
    const weatherIcon=document.querySelector('[weatherIcon]');
    const temp=document.querySelector('[temp]');
    const windspeed=document.querySelector('[windspeed]');
    const humidity=document.querySelector('[humidity]');
    const cloud=document.querySelector('[cloud]');
    
    CityName.innerHTML=weatherI?.name;
    CountryIcon.src = `https://flagcdn.com/144x108/${weatherI?.sys?.country.toLowerCase()}.png`;
    dsec.innerText = weatherI?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherI?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherI?.main?.temp} °C`;
    windspeed.innerText = `${weatherI?.wind?.speed} m/s`;
    humidity.innerText = `${weatherI?.main?.humidity}%`;
    cloud.innerText = `${weatherI?.clouds?.all}%`;

 }
 function getLoaction(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);

    }else{
        alert(`no grolocation support `)
    }
 }
  
 function showPosition(position){
    const userContaines={
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinates",JSON.stringify(userContaines));
    fetchUserWeatherInfo(userContaines)
 }
 const  GrantPermision =document.querySelector("[GrantPermision]");
 GrantPermision.addEventListener("click",getLoaction);

const searchInput=document.querySelector("[searchInput]");

 dataSearch.addEventListener("submit",(e)=>{
    e.preventDefault();
    let CityName=searchInput.value;

    if(CityName===''){
        return;
    }else{
       fetchSearchWeatherInfo(CityName) 
    }
 })

// function handleClick(e){
//     e.preventDefault();
//     let city=searchInput.value;
//     if(city===''){
//         return;
//     }else{
//         fetchSearchWeatherInfo(city)
//     }
// }

 async function fetchSearchWeatherInfo(city){
    loading.classList.add("active");
    weatherInfo.classList.remove("active"); 
    grandLocation.classList.remove("active");

    try{
        const response=await fetch(`
        https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric
        `);
        const data=await response.json();
        loading.classList.remove("active");
        weatherInfo.classList.add("active"); 
        renderWeather(data);
    }catch(ee){
        alert(`API Not Working ${ee}`)
    }

 }