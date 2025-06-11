const express = require("express");
const app = express();

const path = require("path");
const PORT = 8000;

const multer = require('multer')

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')

    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }

})

const upload = multer({ storage: storage })

app.get("/", (req, res) => {
    return res.render("homepage")

})

app.post("/upload",  upload.single('profileImage'), (req, res)=> {
    console.log(req.file);
    
    return res.redirect("/")
})


app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`))