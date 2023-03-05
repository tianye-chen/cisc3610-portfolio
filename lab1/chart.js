document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  let insertData;
  // add function to insert and remove buttons
  document.getElementById("insertSubmit").onclick = submitNewData;
  document.getElementById("removeSubmit").onclick = removeCurrData;

  let data = [
    { name: "Apple", quantity: 20, color: "red" },
    { name: "Orange", quantity: 10, color: "orange" },
    { name: "Banana", quantity: 15, color: "yellow" },
  ];

  // when insert button is clicked, add new data to data array
  function submitNewData(e) {
    e.preventDefault();
    insertData = document.getElementById("insertForm").elements;

    // check if all fields are filled
    if (insertData.name.value && insertData.quantity.value && insertData.color.value) {
      data.push({
        name: insertData.name.value,
        quantity: parseInt(insertData.quantity.value),
        color: insertData.color.value,
      });
    }

    draw();
    console.log(data);
  }

  // when remove button is clicked, remove data from data array
  function removeCurrData(e) {
    e.preventDefault();
    removeData = document.getElementById("removeForm").elements;

    // check if name field is filled
    if (removeData.name.value) {
      // loop through data array and remove data with matching name
      for (let i = 0; i < data.length; i++) {
        if (data[i].name == removeData.name.value) {
          data.splice(i, 1);
        }
      }
    }

    draw();
    console.log(data);
  }

  function draw() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let fontSize = 24;
    for (let i = 0; i < data.length; i++) {
      ctx.beginPath();
      ctx.font = fontSize + "px sans-serif";

      // draw bar based on quantity and position it based on number of elements in data
      ctx.fillStyle = data[i].color;
      ctx.fillRect(
        0,
        (i * canvas.height) / data.length,
        data[i].quantity * 10,
        canvas.height / data.length
      );
      ctx.fill();

      // draw text at the end of the bar and position it based on number of elements in data
      ctx.fillStyle = "black";
      ctx.fillText(data[i].name, 0, (i * canvas.height) / data.length + fontSize);
      ctx.fillText(
        data[i].quantity,
        data[i].quantity * 10 - 28,
        (i * canvas.height) / data.length + fontSize
      );
    }
  }

  draw();
});
