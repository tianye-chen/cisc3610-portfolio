document.addEventListener("DOMContentLoaded", () => {
  let planetArray = [
    {
      name: "Earth",
      imgSrc: "<img src='./images/earth.png' height='300' width='300'/>",
      gravityScale: 1,
    },
    {
      name: "The Moon",
      imgSrc: "<img src='./images/moon.png' height='300' width='300'/>",
      gravityScale: 0.17,
    },
    {
      name: "Mars",
      imgSrc: "<img src='./images/mars.png' height='300' width='300'/>",
      gravityScale: 0.38,
    },
    {
      name: "Venus",
      imgSrc: "<img src='./images/venus.webp' height='300' width='300'/>",
      gravityScale: 0.91,
    },
    {
      name: "Jupiter",
      imgSrc: "<img src='./images/jupiter.png' height='300' width='300'/>",
      gravityScale: 2.34,
    },
    {
      name: "Saturn",
      imgSrc: "<img src='./images/saturn.png' height='300' width='300'/>",
      gravityScale: 0.93,
    },
    {
      name: "Uranus",
      imgSrc: "<img src='./images/uranus.png' height='300' width='300'/>",
      gravityScale: 0.92,
    },
    {
      name: "Neptune",
      imgSrc: "<img src='./images/neptune.png' height='300' width='300'/>",
      gravityScale: 1.12,
    },
    {
      name: "Pluto",
      imgSrc: "<img src='./images/pluto.png' height='300' width='300'/>",
      gravityScale: 0.06,
    },
    {
      name: "Mercury",
      imgSrc: "<img src='./images/mercury.png' height='300' width='300'/>",
      gravityScale: 0.38,
    },
    {
      name: "The Sun",
      imgSrc: "<img src='./images/sun.png' height='300' width='300'/>",
      gravityScale: 27.9,
    },
  ];

  let currentActiveIndex = 0;
  let userWeight = 0;

  document.getElementById("carousel-item-left").onclick = prevClick;
  document.getElementById("carousel-item-right").onclick = nextClick;

  updateCarousel();

  document.getElementById("weight").onchange = () => {
    userWeight = document.getElementById("weight").value * planetArray[currentActiveIndex].gravityScale;
    document.getElementById("adjusted-weight").innerHTML = userWeight;
  };

  function prevClick() {
    currentActiveIndex--;
    if (currentActiveIndex < 0) {
      currentActiveIndex = planetArray.length - 1;
    }

    updateCarousel();
  }

  function nextClick() {
    currentActiveIndex = (currentActiveIndex + 1) % planetArray.length;
    console.log(document.getElementById("carousel-item-center").classList);
    document.activeElement = document.getElementById("carousel-item-center");

    updateCarousel();
  }

  function updateCarousel() {
    let leftItem = currentActiveIndex - 1 < 0 ? planetArray.length - 1 : currentActiveIndex - 1;
    let centerItem = currentActiveIndex;
    let rightItem = currentActiveIndex + 1 >= planetArray.length ? 0 : currentActiveIndex + 1;

    document.getElementById("planet-name").innerHTML = planetArray[centerItem].name;
    document.getElementById("carousel-item-left").innerHTML = planetArray[leftItem].imgSrc;
    document.getElementById("carousel-item-center").innerHTML = planetArray[centerItem].imgSrc;
    document.getElementById("carousel-item-right").innerHTML = planetArray[rightItem].imgSrc;
    document.getElementById("adjusted-weight").innerHTML = userWeight * planetArray[centerItem].gravityScale;
    document.getElementById("planet-name2").innerHTML = planetArray[centerItem].name + ": ";
  }
});
