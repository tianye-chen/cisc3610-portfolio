document.addEventListener("DOMContentLoaded", function () {
  let data;
  let monthlyData = [];
  let entriesPerMonth = 10000;

  let totalFare = 0;
  let averageFare = 0;
  let highestFare = 0;
  let totalPassengerCount = 0;
  let averagePassengerCount = 0;
  let highestPassengerCount = 0;
  let totalDistance = 0;
  let averageDistance = 0;
  let paymentType = [0, 0, 0, 0, 0, 0];
  let rideType = [0, 0, 0, 0, 0, 0];

  async function getData() {
    console.log("start");

    for (let i = 1; i <= 12; i++) {
      resetVariables();
      data = await fetch(
        `https://data.cityofnewyork.us/resource/m6nq-qud6.json?$limit=${entriesPerMonth}&$where=tpep_pickup_datetime between '2021-${
          i >= 10 ? i : "0" + i
        }-01T00:00:00.000' and '2021-12-31T23:59:59.999'`,
        {
          method: "GET",
          headers: {
            "X-App-Token": "jb4ZTYWbKjrIabUVx18uUQd6o",
          },
        }
      );

      data = await data.json();

      for (let j = 0; j < data.length; j++) {
        totalFare += parseFloat(data[j].total_amount);
        totalPassengerCount += parseInt(data[j].passenger_count);
        totalDistance += parseFloat(data[j].trip_distance);

        if (parseFloat(data[j].total_amount) > highestFare) {
          highestFare = parseFloat(data[j].total_amount);
        }

        if (parseInt(data[j].passenger_count) > highestPassengerCount) {
          highestPassengerCount = parseInt(data[j].passenger_count);
        }

        paymentType[parseInt(data[j].payment_type) - 1]++;
        rideType[parseInt(data[j].ratecodeid) - 1]++;
      }

      averageFare = totalFare / data.length;
      averagePassengerCount = totalPassengerCount / data.length;
      averageDistance = totalDistance / data.length;

      monthlyData.push(
        new MonthlyData(
          i,
          totalFare,
          averageFare,
          highestFare,
          totalPassengerCount,
          averagePassengerCount,
          highestPassengerCount,
          totalDistance,
          averageDistance
        )
      );
    }

    console.log(monthlyData);
    console.log(paymentType);
    console.log("end");
  }

  getData().then(() => {
    let taxiChart = document.getElementById("avg-fare-and-distance-chart").getContext("2d");
    let avgFareAndDistanceChart = new Chart(taxiChart, {
      type: "line",
      data: {
        labels: monthlyData.map((data) => data.getMonth()),
        datasets: [
          {
            label: "Average Fare ($)",
            data: monthlyData.map((data) => data.getAverageFare()),
            backgroundColor: "rgba(0, 255, 0, 1)",
            borderWidth: 1,
            borderColor: "#777",
            hoverBorderWidth: 3,
            hoverBorderColor: "#000",
          },
          {
            label: "Average Distance (mi)",
            data: monthlyData.map((data) => data.getAverageDistance()),
            backgroundColor: "rgba(0, 0, 255, 1)",
            borderWidth: 1,
            borderColor: "#777",
            hoverBorderWidth: 3,
            hoverBorderColor: "#000",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Average Fare and Distance",
            fontSize: 25,
          },
        },
        legend: {
          position: "right",
        },
        tooltips: {
          enabled: true,
        },
      },
    });

    let paymentTypeChart = new Chart(document.getElementById("payment-type-chart"), {
      type: "pie",
      data: {
        labels: ["Credit Card", "Cash", "No Charge", "Dispute", "Unknown", "Voided Trip"],
        datasets: [
          {
            label: "Payment Type",
            data: paymentType,
            backgroundColor: [
              "rgba(0, 255, 0, 1)",
              "rgba(0, 0, 255, 1)",
              "rgba(255, 0, 0, 1)",
              "rgba(255, 255, 0, 1)",
              "rgba(0, 255, 255, 1)",
              "rgba(255, 0, 255, 1)",
            ],
            borderWidth: 1,
            borderColor: "#777",
            hoverBorderWidth: 3,
            hoverBorderColor: "#000",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Payment Type",
            fontSize: 25,
          },
        },
        legend: {
          position: "right",
        },
        tooltips: {
          enabled: true,
        },
      },
    });

    let totalFareChart = new Chart(document.getElementById("total-fare-chart"), {
      type: "bar",
      data: {
        labels: monthlyData.map((data) => data.getMonth()),
        datasets: [
          {
            label: "Total Fare ($)",
            data: monthlyData.map((data) => data.getTotalFare()),
            backgroundColor: "rgba(0, 255, 0, 1)",
            borderWidth: 1,
            borderColor: "#777",
            hoverBorderWidth: 3,
            hoverBorderColor: "#000",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Total Fare",
            fontSize: 25,
          },
        },
        legend: {
          display: true,
        },
        tooltips: {
          enabled: true,
        },
      },
    });

    let rideTypeChart = new Chart(document.getElementById("ride-type-chart"), {
      type: "pie",
      data: {
        labels: [
          "Standard",
          "JFK",
          "Newark",
          "Nassau or Westchester",
          "Negotiated Fare",
          "Group Ride",
        ],
        datasets: [
          {
            label: "Ride Type",
            data: rideType,
            backgroundColor: [
              "rgba(0, 255, 0, 1)",
              "rgba(0, 0, 255, 1)",
              "rgba(255, 0, 0, 1)",
              "rgba(255, 255, 0, 1)",
              "rgba(0, 255, 255, 1)",
              "rgba(255, 0, 255, 1)",
            ],
            borderWidth: 1,
            borderColor: "#777",
            hoverBorderWidth: 3,
            hoverBorderColor: "#000",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Ride Type",
            fontSize: 25,
          },
        },
        legend: {
          position: "right",
        },
        tooltips: {
          enabled: true,
        },
      },
    });

    document.getElementById("title").innerHTML = `New York City Taxi Data (2021) - Based on ${entriesPerMonth} entries per month`;
  });

  function resetVariables() {
    totalFare = 0;
    averageFare = 0;
    highestFare = 0;
    totalPassengerCount = 0;
    averagePassengerCount = 0;
    highestPassengerCount = 0;
    totalDistance = 0;
    averageDistance = 0;
  }
});

class MonthlyData {
  constructor(
    month,
    totalFare,
    averageFare,
    highestFare,
    totalPassengerCount,
    averagePassengerCount,
    highestPassengerCount,
    totalDistance,
    averageDistance
  ) {
    this.month = month;
    this.totalFare = totalFare;
    this.averageFare = averageFare;
    this.highestFare = highestFare;
    this.totalPassengerCount = totalPassengerCount;
    this.averagePassengerCount = averagePassengerCount;
    this.highestPassengerCount = highestPassengerCount;
    this.totalDistance = totalDistance;
    this.averageDistance = averageDistance;
  }

  getMonth() {
    switch (this.month) {
      case 0:
        return "Jan";
      case 1:
        return "Feb";
      case 2:
        return "Mar";
      case 3:
        return "Apr";
      case 4:
        return "May";
      case 5:
        return "Jun";
      case 6:
        return "Jul";
      case 7:
        return "Aug";
      case 8:
        return "Sep";
      case 9:
        return "Oct";
      case 10:
        return "Nov";
      case 11:  
        return "Dec";
    }
  }

  getTotalFare() {
    return this.totalFare;
  }

  getAverageFare() {
    return this.averageFare;
  }

  getHighestFare() {
    return this.highestFare;
  }

  getTotalPassengerCount() {
    return this.totalPassengerCount;
  }

  getAveragePassengerCount() {
    return this.averagePassengerCount;
  }

  getHighestPassengerCount() {
    return this.highestPassengerCount;
  }

  getTotalDistance() {
    return this.totalDistance;
  }

  getAverageDistance() {
    return this.averageDistance;
  }
}
