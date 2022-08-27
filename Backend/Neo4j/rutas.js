module.exports = app => {
    var router = require("express").Router();
    const control = require("./controller");

    router.get("/select/:carnet",control.selectByCarnet)
    router.post("/login",control.login);
    router.post("/createUser",control.createUser);

    app.use("/api/prototipo",router);
}