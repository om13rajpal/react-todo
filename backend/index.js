const express = require("express")
const { authRoute } = require("./routes/auth")
const { todoRoute } = require("./routes/todo")
const { connectMongo } = require("./db/db")

const app = express()

app.use(express.json())

app.use(authRoute)
app.use(todoRoute)

connectMongo()

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`your server is running on http://localhost:${port}`);
})