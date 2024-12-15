const hero = document.querySelector(".hero");
const contact = document.querySelector("#contact");
const homeBtn = document.querySelector("#home");
const contactBtn = document.querySelector("#contactBtn");
const navLink = document.querySelectorAll(".nav-link");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.getElementById("searchInput");
const find = document.querySelector("#find");
let lastSearch = localStorage.getItem("lastSearch") || "egypt";

for (let i = 0; i < navLink.length; i++) {
  navLink[i].addEventListener("click", function () {
    if (!navLink[i].classList.contains("active")) {
      navLink[i].classList.add("active");
      for (let j = 0; j < navLink.length; j++) {
        if (j !== i) {
          navLink[j].classList.remove("active");
        }
      }
    }
  });
}

homeBtn.addEventListener("click", function () {
  hero.classList.remove("d-none");
  contact.classList.add("d-none");
});
contactBtn.addEventListener("click", function () {
  hero.classList.add("d-none");
  contact.classList.remove("d-none");
});
// https://api.weatherapi.com/v1/forecast.json?key=53ec5d4af5ae4394b73101922241212&q=london&days=3
// data.forecast.forecastday[0].day.maxtemp_c
// data.forecast.forecastday[0].day.mintemp_c
// data.forecast.forecastday[0].date
// data.forecast.forecastday[0].day.condition.text  علشان  cloudy sunny
// data.forecast.forecastday[0].day.condition.icon  علشان icons/weather
// data.location.name

async function getdata(city = "egypt") {
  try {
    const x = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=53ec5d4af5ae4394b73101922241212&q=${city}&days=3`
    );
    if (!x.ok) {
      throw new Error(`HTTP error!`);
    }
    const data = await x.json();
    displayWeather(data);
  } catch (err) {
    document.getElementById("erro").innerHTML = err.message;
  } finally {
    document.getElementById("erro").innerHTML = "";
  }
}

getdata(lastSearch);

function displayWeather(data) {
  const getDayAndMonth = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString("en-us", { weekday: "long" }), // اسم اليوم
      month: date.toLocaleDateString("en-us", {
        month: "long",
        day: "numeric",
      }), // اسم الشهر
    };
  };
  const cartona = (document.getElementById("cartona").innerHTML = `

    <div class="col-lg-4 mainCard">
            <div class="inner shadow secondcolor">
              <div
                class="mainColor text-light p-2 d-flex align-items-center justify-content-between"
              >
                <p class="mb-0">${
                  getDayAndMonth(data.forecast.forecastday[0].date).day
                }</p>
                <p class="mb-0">${
                  getDayAndMonth(data.forecast.forecastday[0].date).month
                }</p>
              </div>
              <div class="text-white p-4">
                <h2>${data.location.name}</h2>
                <h2 class="h1 display-1 fw-bolder">${
                  data.forecast.forecastday[0].day.maxtemp_c
                } <sup>o</sup>C</sup></h2>
                <img src="${
                  data.forecast.forecastday[0].day.condition.icon
                }" alt="" />
                <p class="text-primary">${
                  data.forecast.forecastday[0].day.condition.text
                }</p>
              </div>
              <div class="d-flex justify-content-around">
                <span class="d-flex"
                  ><img
                    class="d-block w-100 h-50 me-2"
                    src="img/icon-umberella.png"
                    alt=""
                  />
                  <p>${
                    data.forecast.forecastday[0].day.daily_chance_of_rain
                  }%</p></span
                >
                <span class="d-flex"
                  ><img
                    class="d-block w-100 h-50 me-2"
                    src="img/icon-wind.png"
                    alt=""
                  />
                  <p>${
                    data.forecast.forecastday[0].day.maxwind_kph
                  }km/h</p></span
                >
                <span class="d-flex"
                  ><img
                    class="d-block w-100 h-50 me-2"
                    src="img/icon-compass.png"
                    alt=""
                  />
                  <p>${
                    data.forecast.forecastday[0].day.avgvis_km
                  } East</p></span
                >
              </div>
            </div>
          </div>
          <div class="col-lg-4 secondCard">
            <div class="inner secondcolor h-100">
              <div class="mainColor text-light p-2 text-center">
                <p class="mb-0">${
                  getDayAndMonth(data.forecast.forecastday[1].date).day
                }</p>
              </div>
              <div class="text-white text-center p-4">
                <h2><img src="${
                  data.forecast.forecastday[1].day.condition.icon
                }" alt="" /></h2>
                <h2 class="h1">${
                  data.forecast.forecastday[1].day.maxtemp_c
                }<sup>o</sup></h2>
                <p>${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></p>
                <p class="text-primary">${
                  data.forecast.forecastday[1].day.condition.text
                }</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 secondCard">
            <div class="inner secondcolor h-100">
              <div class="mainColor text-light p-2 text-center">
                <p class="mb-0">${
                  getDayAndMonth(data.forecast.forecastday[2].date).day
                }</p>
              </div>
              <div class="text-white text-center p-4">
                <h2><img src="${
                  data.forecast.forecastday[2].day.condition.icon
                }" alt="" /></h2>
                <h2 class="h1">${
                  data.forecast.forecastday[2].day.maxtemp_c
                }<sup>o</sup></h2>
                <p>${
                  data.forecast.forecastday[2].day.mintemp_c
                } <sup>o</sup></p>
                <p class="text-primary">${
                  data.forecast.forecastday[2].day.condition.text
                }</p>
              </div>
            </div>
          </div>

    `);
}

searchInput.addEventListener("input", searchAll);
find.addEventListener("click", searchAll);
function searchAll() {
  const cityName = searchInput.value.trim();
  if (cityName !== "") {
    localStorage.setItem("lastSearch", cityName);
    getdata(cityName);
  }
}
