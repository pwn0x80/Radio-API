const radioList = require("./routes/radioList")
const express = require("express")
var cors = require('cors')
const app = express()
app.use(express.json());

app.use(cors())

app.use("/", radioList)
app.listen(process.env.PORT || 4000, function() {
  console.log("server is running on port");
});


