const express = require('express');
const customerRoutes = require('./modul/routes');


const app = express();
const port = 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/customer", customerRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});