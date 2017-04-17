const express = require("express");
const bodyParser = require("body-parser");
const nunjucks = require("nunjucks");
const recursive = require('recursive-readdir');
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use('/public', express.static('public'));

nunjucks.configure('views', {
	autoescape: true,
	express: app
});

app.engine("html",nunjucks.render);

app.set("view engine","html");

app.get("/", (req, res) => {
    res.render("reload_page.html");
});

app.post ("/getpicture", (req,res) => {
    let select = req.body["myselect"];
    let pathPic = '';
    if (select === "1"){
        pathPic = path.join("public", "image");
    }
    if (select === "2"){
        pathPic = path.join("public", "image", "animal");
    }
    if (select === "3"){
        pathPic = path.join("public", "image", "things");
    } 
    recursive (pathPic, (err, pictures) => {
        let data = {
            "pictures" : pictures
        };
        res.render ("reload_page.html", data);
    });
});

app.listen(3000, () => {
    console.log("sever listen on 3000");
});