const express = require("express");


const {connectMongoDb} = require("./connection")
const userRouter = require("./routes/user")

const {logReqRes} = require("./middlewares/index")


const app = express();
const PORT = 8000;

// Connection
connectMongoDb('mongodb://127.0.0.1:27017/my-app-1')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));


// Middleware
app.use(express.urlencoded({extended:false}))
app.use(logReqRes("log.txt"))

// Routes
app.use("/api/users", userRouter)

app.listen(PORT, ()=>console.log(`Server Started at PORT:${PORT}`)
)