document.addEventListener("DOMContentLoaded", () => {
  let tailwindClass = "rounded-lg";
  let animalArray = [
    {
      name: "Dog",
      imgSrc: `<img src='./images/dog.png' height='300' width='300' class="${tailwindClass}"/>`,
      soundSrc: "<audio src='./sounds/dog.mp3'></audio>",
    },
    {
      name: "Cat",
      imgSrc: `<img src='./images/cat.png' height='300' width='300' class="${tailwindClass}"/>`,
      soundSrc: "<audio src='./sounds/cat.mp3'></audio>",
    },
    {
      name: "Cow",
      imgSrc: `<img src='./images/cow.png' height='300' width='300' class="${tailwindClass}"/>`,
      soundSrc: "<audio src='./sounds/cow.mp3'></audio>",
    },
    {
      name: "Chicken",
      imgSrc: `<img src='./images/chicken.png' height='300' width='300' class="${tailwindClass}"/>`,
      soundSrc: "<audio src='./sounds/chicken.mp3'></audio>",
    },
    {
      name: "Pig",
      imgSrc: `<img src='./images/pig.png' height='300' width='300' class="${tailwindClass}"/>`,
      soundSrc: "<audio src='./sounds/pig.mp3'></audio>",
    },
    {
      name: "Sheep",
      imgSrc: `<img src='./images/sheep.png' height='300' width='300' class="${tailwindClass}"/>`,
      soundSrc: "<audio src='./sounds/sheep.mp3'></audio>",
    },
    {
      name: "Horse",
      imgSrc: `<img src='./images/horse.png' height='300' width='300' class="${tailwindClass}"/>`,
      soundSrc: "<audio src='./sounds/horse.mp3'></audio>",
    },
    {
      name: "Eagle",
      imgSrc: `<img src='./images/eagle.png' height='300' width='300' class="${tailwindClass}"/>`,
      soundSrc: "<audio src='./sounds/eagle.mp3'></audio>",
    },
    {
      name: "Duck",
      imgSrc: `<img src='./images/duck.png' height='300' width='300' class="${tailwindClass}"/>`,
      soundSrc: "<audio src='./sounds/duck.mp3'></audio>",
    },
  ];

  let soundGrid = document.getElementById("soundGrid");
  let html = "";

  // create a component consisting of an image and text for each animal
  for (let i = 0; i < animalArray.length; i++) {
    html += 
    `<div class="group cursor-pointer select-none" id="animal${i}">
      <div class="relative overflow-hidden 
        transition-all duration-300 group-hover:scale-125 group-hover:z-10">
        ${animalArray[i].imgSrc} 

        <div class="absolute inset-0 flex justify-center items-center
        text-white text-[6em] font-bold uppercase
          opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-75">

          <svg viewBox="0 0 10 2" class="w-full h-full">
            <text x="5" y="1.75" text-anchor="middle" font-size="2.2" fill="none" stroke-width=".05" stroke="#fff" font-family="sans-serif">
              ${animalArray[i].name}
            </text>
          </svg>

        </div>
      </div> 
    </div>`;
  }
  soundGrid.innerHTML = html;

  // add audio to each animal on click
  for (let i = 0; i < animalArray.length; i++) {
    let animal = document.getElementById(`animal${i}`);
    animal.addEventListener("click", () => {
      let audio = new Audio();
      audio.src = `./sounds/${animalArray[i].name.toLowerCase()}.mp3`;
      audio.play();
    });
  }
});
