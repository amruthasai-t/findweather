
wicon=document.querySelector(".wicon");
let weather={
    fetchWeather: function(city){
        fetch(
            "http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=5fd8f21ba2bcfb268c0b6df9784fe167"
        )
        .then((response)=>{
            if(!response.ok){
                alert("No weather found.");
                throw new Error("No weather found.");
            }
            return response.json();
        })
        .then((data)=>this.displayWeather(data));
    },
    displayWeather: function(data){
        const {name}=data;
        const {description,id}=data.weather[0];
        const {temp,humidity}=data.main;
        const {speed}=data.wind;
        if(id == 800){
            wicon.src = "icons/sunny.png";
        }else if(id >= 200 && id <= 232){
            wicon.src = "icons/thunder.png";  
        }else if(id >= 600 && id <= 622){
            wicon.src = "icons/snowy.png";
        }else if(id >= 701 && id <= 781){
            wicon.src = "icons/foggy.png";
        }else if(id >= 801 && id <= 804){
            wicon.src = "icons/cloudy.png";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            wicon.src = "icons/rainy.png";
        }
        document.querySelector(".city").innerText = "Weather in " + name +", "+data.sys.country;
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = Math.floor(temp) + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
    },
    search: function(){
        this.fetchWeather(document.querySelector(".input-part").value);
    },
};
document.querySelector(".search").addEventListener("click",function(){
    weather.search();
});
document
    .querySelector(".input-part")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
const timeEl=document.querySelector(".time");
setInterval(()=>{
    const time=new Date();
    const hour=time.getHours();
    const hours12=hour>=13?hour%12:hour;
    const minutes=time.getMinutes();
    const ampm=hour>=12?"PM":"AM";
    timeEl.innerHTML=hours12+":"+minutes+" "+`<span class="am-pm">${ampm}</span>`;
    
},100);