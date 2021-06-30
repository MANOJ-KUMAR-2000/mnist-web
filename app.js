const express = require("express")

app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.listen(3300)


app.get("/", (req, res) => {
    res.render("mainPage");
})