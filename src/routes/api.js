import express from "express";
import APIController from "../controller/APIController";
let router = express.Router();

const initAPIRoute = (app) => {
  router.get("/users", APIController.getAllUsers);  //-> method Get -> READ data
  router.post("/create-user", APIController.createNewUser);  //-> method Post -> CREATE data
  router.put("/update-user", APIController.updateUser); //-> method Put -> UPDATE dataUser
  router.delete("/delete-user/:id", APIController.deleteUser); //-> method
  return app.use("/api/v1/", router);
};

export default initAPIRoute;
