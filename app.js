const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 5000;
const bcrypt = require("bcryptjs")

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/your-database-name', {
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));




const auth = require("./routes/auth")
app.use("/",auth)

const user = require("./routes/user")
app.use("/user",user)





app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});















