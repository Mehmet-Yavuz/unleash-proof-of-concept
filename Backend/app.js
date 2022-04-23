const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const SECRET = process.env.SECRET;
const axios = require("axios").default;
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3006",
};
app.use("*", cors(corsOptions));

axios.defaults.headers.common["Authorization"] = SECRET;

async function axiosAsyncCallFeatures(url, featureName) {
  const axiosGet = await axios.get(url);
  const featureData = axiosGet.data[featureName];
  return featureData;
}

app.get("/api", (req, res) => {
  let url = "https://api.jsonbin.io/b/6245bff11a1b610f0848afad";
  let featureName = "newValue";
  axiosAsyncCallFeatures(url, featureName)
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
