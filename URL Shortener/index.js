const express = require("express")
const {connectToMongoDB} = require("./connect")
const path = require("path")
const cookieParser = require("cookie-parser")
const {restrictToLoggedinUserOnly} = require("./middlewares/auth")
const URL = require("./models/url")


const staticRoute = require("./routes/staticRouter")
const urlRoute = require("./routes/url")
const userRoute = require("./routes/user")

const app = express()
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=> console.log("MonogoDB connected"))

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())


app.use('/url', restrictToLoggedinUserOnly,urlRoute)
app.use("/",staticRoute)
app.use("/user",userRoute)
app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );

    if (!entry) {
        return res.status(404).send("URL not found");
    }

    res.redirect(entry.redirectURL);
});


app.listen(PORT, ()=> console.log(`Server Started at PORT ${PORT}`))