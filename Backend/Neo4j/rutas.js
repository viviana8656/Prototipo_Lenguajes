module.exports = app => {
    var router = require("express").Router();
    const control = require("./controller");

    router.get("/select/:carnet",control.selectByCarnet);
    router.post("/login",control.login);
    router.post("/createUser",control.createUser);
    router.post("/createTask",control.createTask);
    router.get("/getTasks/:carnet",control.getUserTasks);
    router.post("/completarTarea",control.completeTask);
    router.delete("/delete/:nombre",control.deleteTask);
    app.use("/api/prototipo",router);
}