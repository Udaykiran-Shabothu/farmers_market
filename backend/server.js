const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connect_database = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes")

const app = express()

app.use(express.json())
app.use(cors())

connect_database();

app.use("/api/auth", authRoutes);
app.use("/api/product",productRoutes);

const initializeServer = () => {
        const port = process.env.PORT || 5000
        app.listen(port,() => console.log(`server is a running at path ${port}`))
}
initializeServer()


