const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");


const corsOptions = require("./config/corsOption")
const ebookRoute = require("./routes/ebookRoute")
const userRoute = require("./routes/userRoute")
const cartRoute = require("./routes/cartRoute")
const orderRoute = require("./routes/orderRoute")


dotenv.config()
const PORT = 5000
const app = express();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("hello Welcome to Codebook Server")
})


app.use("/api/users", userRoute);
app.use("/api/ebook", ebookRoute)
app.use("/api/cart", cartRoute)
app.use("/api/order", orderRoute)



app.listen(process.env.PORT || PORT, () => 
console.log(`yoo, we are live on port ${PORT}`))


mongoose.connect(process.env.MONGO_URI)


.then(() => console.log("Connected to Database"))
.catch((error) => console.log("MongoDB connection error:", error)) 