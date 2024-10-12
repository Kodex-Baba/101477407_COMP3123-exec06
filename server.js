const express = require("express")
const booksRoutes = require("./routes/books")
const mongoose = require("mongoose")

const DB_CONNECTION_STRING = "mongodb+srv://kodexbaba41:Ea4312016085*@cluster0.o7wsr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log("Error: ", err)
})

const app = express()

const SERVER_PORT = 3001

app.use(express.json())
app.use(express.urlencoded())

app.use("/api/v1", booksRoutes)

//app.use("/books", booksRoutes)

app.route("/")
    .get((req, res) => {
        res.send("<h1>MogoDB + Mongoose Example</h1>")
    })

app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})