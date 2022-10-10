var express = require("express");
const multer = require("multer");
(app = express()),
  (port = process.env.PORT || 3001),
  (mongoose = require("mongoose")),
  (bodyParser = require("body-parser"));
cors = require("cors");

const storage = multer.diskStorage({
  // lưu trữ các ảnh vào ổ đĩa
  destination: function (req, file, cb) {
    cb(null, "media"); // lưu vào mục này
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        "-" +
        file.originalname
    );
  },
});
console.log(storage, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
const upload = multer({ storage: storage }).any();
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/upload", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected !!!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(upload);
app.use(express.static("media"));
app.use(cors({}));
app.use(bodyParser.json());

var routes = require("./api/route");
routes(app);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port);

console.log("Server started on: " + port);
