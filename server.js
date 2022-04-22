require("dotenv").config({ path: './backend/config/.env' });
const express = require('express')
const cors = require("cors")
const cookieParser = require('cookie-parser');

const db = require('./backend/db');

const morganCustom = require("./backend/middleware/morganCustom")
const errorHandler = require("./backend/middleware/errorHandler")
const successFn = require("./backend/middleware/successFn");

//  бааз холбож байгаа нь
db.dbConntect()

const app = express();
const port = process.env.PORT

var whitelist = [
    process.env.CLIENT_URL,
    "https://gasp.mn"
    //"http://localhost:3000"
]
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    allowedHeaders: "Authorization, Set-Cookie, Content-Type, Accept, SameSite",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
}

//  middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(morganCustom)
app.use(successFn)

//  routes
app.use("/api/news", require("./backend/routes/news"))
app.use("/api/author", require("./backend/routes/author"))
app.use("/api/video", require("./backend/routes/videos"))
app.use("/api/podcast", require("./backend/routes/podcast"))
app.use("/api/category", require("./backend/routes/category"))
app.use("/api/config", require("./backend/routes/config"))
app.use("/api/sign", require("./backend/routes/sign"))

app.use(errorHandler)
app.use('/public', express.static("./public/server"));

//  server
const server = require('http').createServer(app)
server.listen(port, () =>
    {
        console.log(`Сервер ${port} порт дээр аслаа`)
    }
);
