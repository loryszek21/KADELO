const express = require("express");
const cors = require("cors");

const corsOptions = {
    origin: "http://localhost:3000",
};

const app = express();
const port = 5001;

app.use(cors(corsOptions));
app.use(express.json());

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
