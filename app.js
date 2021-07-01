const express = require("express")
const tf = require('@tensorflow/tfjs');
app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let classes = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

app.listen(3300);
console.log("listening.........");


app.get("/", (req, res) => {
    res.render("mainPage");
})

app.post("/pre", async(req, res) => {
    const model = await tf.loadLayersModel("./models/mnistJSModel/model.json");
    let predictions = model.predict(req.body.img_tensor).data()
    predictions.then(function(res) {
        let results = Array.from(res);
        console.log(results)
        ans = classes[results.indexOf(Math.max(...results))]
    })
    console.log(ans);
    res.json({ num: ans });
})