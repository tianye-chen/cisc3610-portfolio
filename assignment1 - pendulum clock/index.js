document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const ballLineLength = 250; // Length of pendulum line
  const ballRadius = 20; // Radius of pendulum ball
  const startingAngle = -Math.PI / 10; // Starting angle
  const angleVelocity = Math.sqrt(9.81 / ballLineLength); // Angular velocity
  const originX = canvas.width / 2; // X coordinate of pendulum origin
  const originY = 110; // Y coordinate of pendulum origin
  const speedSlider = document.getElementById("speedSlider");

  let angle = startingAngle; // Current angle
  let speed = 6; // Speed of pendulum swing
  let t = 0; // Time for pendulum swing

  function updateAngle() {
    t += speed / 100; // Increment time
    angle = startingAngle * Math.cos(angleVelocity * t); // Calculate new angle
  }

  function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Tianye Chen
    ctx.font = "20px sans-serif";
    ctx.fillStyle = "black";
    ctx.fillText("Tianye Chen", canvas.width - 120, 20);

    // Draw floor
    ctx.beginPath();
    ctx.fillStyle = "#321b0b";
    ctx.fillRect(0, canvas.height - 70, canvas.width, 70);

    //Draw window
    ctx.beginPath();
    ctx.strokeStyle = "#777777";
    ctx.lineWidth = 5;
    ctx.rect(10, 50, 125, 125);
    ctx.fillStyle = "skyblue";
    ctx.fill();
    ctx.moveTo(10 + 125 / 2, 50);
    ctx.lineTo(10 + 125 / 2, 175);

    ctx.stroke();

    // Draw clock background
    ctx.beginPath();
    ctx.fillStyle = "#532d13";
    ctx.lineWidth = 15;
    ctx.fillRect(originX - 100, originY + 5, 200, canvas.height - originY - 10);

    drawPendulumBall();

    // Draw clock body border
    ctx.beginPath();
    ctx.strokeStyle = "#9e5524";
    ctx.lineWidth = 15;
    ctx.strokeRect(originX - 100, originY + 5, 200, canvas.height - originY - 10);

    // Draw top of clock
    ctx.beginPath();
    ctx.lineWidth = 15;
    ctx.arc(originX, originY, 100, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "#f2f2e8";
    ctx.fill();

    drawClockFace();

    // Request next frame
    requestAnimationFrame(draw);
  }

  function drawClockFace() {
    // Calculate the position of each hand using system time
    const hour = new Date().getHours(); // System time in hours, 24 hour format
    const minute = new Date().getMinutes(); // System time in minutes
    const second = new Date().getSeconds(); // System time in seconds

    const hourAngle = (hour * Math.PI) / 6 + (minute * Math.PI) / 360; // Hour hand angle
    const minuteAngle = (minute * Math.PI) / 30; // Minute hand angle
    const secondAngle = (second * Math.PI) / 30; // Second hand angle

    // Draw clock numbers
    ctx.font = "16px sans-serif";
    ctx.fillStyle = "black";

    for (let i = 1; i <= 12; i++) {
      const x = originX + 80 * Math.sin((i * Math.PI) / 6) - 4; 
      const y = originY - 80 * Math.cos((i * Math.PI) / 6) + 4;
      ctx.fillText(i, x, y);
    }

    // Draw digital representation of clock time
    ctx.fillText(
      String(hour).padStart(2, "0") +
        ":" +
        String(minute).padStart(2, "0") +
        ":" +
        String(second).padStart(2, "0"),
      originX - 28,
      originY + 35
    );

    // Draw hour hand
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + 60 * Math.sin(hourAngle), originY - 60 * Math.cos(hourAngle));
    ctx.stroke();

    // Draw minute hand
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + 80 * Math.sin(minuteAngle), originY - 80 * Math.cos(minuteAngle));
    ctx.stroke();

    // Draw second hand
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + 90 * Math.sin(secondAngle), originY - 90 * Math.cos(secondAngle));
    ctx.stroke();

    // Draw clock center
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(originX, originY, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawPendulumBall() {
    // Calculate position of pendulum ball
    const x = ballLineLength * Math.sin(angle);
    const y = ballLineLength * Math.cos(angle);

    // Draw pendulum line
    ctx.lineWidth = 1;
    ctx.strokeStyle = "silver";
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + x, originY + y);
    ctx.stroke();

    // Draw pendulum ball
    ctx.beginPath();
    ctx.fillStyle = "silver";
    ctx.arc(originX + x, originY + y, ballRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(originX + x, originY + y, ballRadius, Math.PI / 0.5, Math.PI / 1.25);
    ctx.fill();
  }

  speedSlider.addEventListener("input", function () {
    // Update speed based on slider value
    speed = speedSlider.value;

    // Update speed label
    document.getElementById("speedSlider_label").innerHTML = "speed " + speed;

    clearInterval(intervalId); // Stop animation loop
    intervalId = setInterval(updateAngle, 1); // Restart animation loop
  });

  intervalId = setInterval(updateAngle, 1); // Update angle
  requestAnimationFrame(draw); // Start animation loop
});
