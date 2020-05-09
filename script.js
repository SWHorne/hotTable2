let express = require('express')
let path = require('path')

let PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extend: true}))
app.use(express.json())














app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  