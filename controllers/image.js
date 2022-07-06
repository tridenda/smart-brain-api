const Clarifai = require("clarifai");

const clarifaiApp = new Clarifai.App({
  apiKey: "8e2278529e8b48ebb40da538b1e54467",
});

const handleApiCall = (req, res) => {
  console.log("this input:", req.body.input);
  clarifaiApp.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("Unable to work with API"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;

  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((data) => {
      res.json(data[0].entries);
    })
    .catch((err) => res.status(400).json("Unable to get entries"));
};

module.exports = { handleImage, handleApiCall };
