const express = require('express');
const coursesRoutes = require('./modul/routes');


const app = express();
const port = 5000;

app.use(express.json());
app.get("/", (req, res) => {
    res.send("Fuck it:) <3");
});

app.use("/courses", coursesRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});