const express = require("express");
const cors = require("cors");
const coursesRoutes = require("./modul/courses/routes");
const usersRoutes = require("./modul/users/routes");
const testRoutes = require("./modul/test/routes");

const corsOptions = {
    origin: "http://localhost:3000",
};

const app = express();
const port = 5000;

app.use(cors(corsOptions));
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Fuck it:) <3");
});

app.use("/courses", coursesRoutes);
app.use("/user", usersRoutes);
app.use("/test", testRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
