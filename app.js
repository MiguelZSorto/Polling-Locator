const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/static'));

app.get("/location", (req, res) => {
    console.log("Received GET on /location");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});