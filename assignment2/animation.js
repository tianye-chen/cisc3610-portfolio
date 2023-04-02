document.addEventListener("DOMContentLoaded", function () {
  // image setup
  let greenCap = new Image();
  greenCap.src = "./Green-Cap-Character-16x18.png";
  greenCap.onload = function () {
    init();
  };

  let redCap = new Image();
  redCap.src = "./Red-Cap-Character-16x18.png";

  let grassField = new Image();
  grassField.src = "./grass_field.png";

  const scale = 2;
  const width = 16;
  const height = 18;
  let step = 4;

  let greenCanvasX = 0;
  let greenCanvasY = 0;
  let redCanvasX = 300;
  let redCanvasY = 250;

  // canvas setup
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  // animation setup
  const walkAnimLoop = [0, 1, 0, 2];
  let currWalkAnimIndex = 0;
  const frameRate = 15;
  let frameCount = 0;
  let currDirection = 0;
  let isKeyDown = false;

  // dialogue setup
  let dialogueIndex = 0;
  const dialogue = [
    "",
    "Hey there.",
    "Wanna hear a joke?",
    "What comes after USA?",
    "USB!",
    "Haha, I'm so funny...",
  ];

  function init() {
    window.addEventListener("keydown", keyDown, false);
    window.addEventListener(
      "keyup",
      function () {
        isKeyDown = false;
      },
      false
    );

    window.requestAnimationFrame(animate);
  }

  function animate() {
    frameCount++;

    if (frameCount < frameRate) {
      window.requestAnimationFrame(animate);
      return;
    }
    frameCount = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(grassField, 0, 0, canvas.width, canvas.height);
    displayDialogue();
    displayInstructions();

    isKeyDown
      ? drawFrame(walkAnimLoop[currWalkAnimIndex], currDirection, greenCanvasX, greenCanvasY)
      : drawFrame(0, currDirection, greenCanvasX, greenCanvasY);
    currWalkAnimIndex = (currWalkAnimIndex + 1) % walkAnimLoop.length;

    ctx.drawImage(
      redCap,
      0,
      18 * 2,
      width,
      height,
      redCanvasX,
      redCanvasY,
      width * scale,
      height * scale
    );
    window.requestAnimationFrame(animate);
  }

  function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(
      greenCap,
      frameX * width,
      frameY * height,
      width,
      height,
      canvasX,
      canvasY,
      width * scale,
      height * scale
    );
  }

  function keyDown(e) {
    switch (e.keyCode) {
      case 87: // w
        isKeyDown = true;
        currDirection = 1;
        greenCanvasY -= step;
        break;
      case 65: // a
        isKeyDown = true;
        currDirection = 2;
        greenCanvasX -= step;
        break;
      case 83: // s
        isKeyDown = true;
        currDirection = 0;
        greenCanvasY += step;
        break;
      case 68: // d
        isKeyDown = true;
        currDirection = 3;
        greenCanvasX += step;
        break;
      case 32: // space
        checkInRangeForDialogue ? dialogueIndex = (dialogueIndex + 1) % dialogue.length : null;
        break;
    }
  }

  function displayDialogue() {
    // display dialogue
    if (dialogueIndex !== 0) {
      ctx.fillStyle = "#ffffffaa";
      ctx.fillRect(redCanvasX - 30, redCanvasY - 40, 200, 30);
    }
    ctx.font = "16px sans-serif";
    ctx.fillStyle = "black";
    ctx.fillText(dialogue[dialogueIndex], redCanvasX - 20, redCanvasY - 20);
  }

  function checkInRangeForDialogue() {
    return redCanvasX - greenCanvasX < width * 3 && redCanvasY - greenCanvasY  < height * 3;
  }

  function displayInstructions() {

    ctx.fillStyle = "#ffffffaa";
    ctx.fillRect(0, canvas.height - 70, 220, 70);
    ctx.font = "16px sans-serif";
    ctx.fillStyle = "black";
    ctx.fillText("Press space for dialogue", 10, canvas.height - 20);
    ctx.fillText("Press WASD for movement", 10, canvas.height - 40);
  }
});
