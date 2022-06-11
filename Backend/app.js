const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const SECRET = process.env.SECRET;
const axios = require("axios").default;
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
};
app.use("*", cors(corsOptions));
const bodyParser = require("body-parser");
app.use(bodyParser.json());

axios.defaults.headers.common["Authorization"] = SECRET;

const DeviceDetector = require("device-detector-js");

async function axiosAsyncCallFeatures(url) {
  const axiosGet = await axios.get(url);
  const featureData = axiosGet.data;
  return featureData;
}

async function axiosAsyncUpdateFeature(url, body) {
  const axiosGet = await axios.put(url, body);
  return axiosGet.data.data;
}

app.get("/theme", (req, res) => {
  let url = "https://api.jsonbin.io/b/6245bff11a1b610f0848afad/latest";

  const ua = req.headers["user-agent"];
  const deviceDetector = new DeviceDetector();
  const device = deviceDetector.parse(ua);
  $ = {};
  switch (device.client.name) {
    case "Chrome":
      $.userRegion = "Region A";
      break;
    case "Firefox":
      $.userRegion = "Region B";
      break;
    case "Microsoft Edge":
      $.userRegion = "Region C";
      break;
    default:
      $.userRegion = "Unknown";
      break;
  }

  axiosAsyncCallFeatures(url)
    .then((data) => {
      data = jsonConcat(data, $);
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

function jsonConcat(o1, o2) {
  for (var key in o2) {
    o1[key] = o2[key];
  }
  return o1;
}

app.put("/edit-theme", (req, res) => {
  let url = "https://api.jsonbin.io/b/6245bff11a1b610f0848afad";
  axiosAsyncUpdateFeature(url, req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
