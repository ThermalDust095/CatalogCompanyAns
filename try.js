const fs = require("fs");

// Load JSON data from file
fs.readFile("testcase2.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  let inputObj = JSON.parse(data);
  console.log("TestCase: ", inputObj); // Log the correct variable

  // Get x and y points
  let xPoints = [];
  let yPoints = [];

  for (let key of Object.keys(inputObj)) {
    if (key !== "keys") {
      let y_val = parseInt(inputObj[key].value, parseInt(inputObj[key].base));
      xPoints.push(parseInt(key));
      yPoints.push(y_val);
    }
  }

  console.log("X Points:", xPoints);
  console.log("Y Points:", yPoints);

  // Get Polynomial
  const coefficients = Array(xPoints.length).fill(0);

  for (let m = 0; m < xPoints.length; m++) {
    const newCoefficients = Array(xPoints.length).fill(0);

    if (m > 0) {
      newCoefficients[0] = -xPoints[0] / (xPoints[m] - xPoints[0]);
      newCoefficients[1] = 1 / (xPoints[m] - xPoints[0]);
    } else {
      newCoefficients[0] = -xPoints[1] / (xPoints[m] - xPoints[1]);
      newCoefficients[1] = 1 / (xPoints[m] - xPoints[1]);
    }

    let startIndex = m === 0 ? 2 : 1;

    for (let n = startIndex; n < xPoints.length; n++) {
      if (m === n) continue;

      for (let nc = xPoints.length - 1; nc >= 1; nc--) {
        newCoefficients[nc] =
          newCoefficients[nc] * (-xPoints[n] / (xPoints[m] - xPoints[n])) +
          newCoefficients[nc - 1] / (xPoints[m] - xPoints[n]);
      }

      newCoefficients[0] =
        newCoefficients[0] * (-xPoints[n] / (xPoints[m] - xPoints[n]));
    }

    for (let nc = 0; nc < xPoints.length; nc++)
      coefficients[nc] += yPoints[m] * newCoefficients[nc];
  }

  console.log("Coefficients of Polynomial: ", coefficients);
  console.log("Scientific Ans = ", coefficients[0].toExponential(10));
  console.log("Normal Ans = ", coefficients[0]);
});
