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

module.exports = { handleImage };
