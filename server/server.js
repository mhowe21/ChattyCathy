const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3030;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//static asset here

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
