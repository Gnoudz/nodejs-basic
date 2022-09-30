import express from "express";
import * as homeController from "../controller/homeController";
let router = express.Router();
const initWebRoute = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/detail/user/:id", homeController.getDetailUser);
  router.post("/create-new-user", homeController.createNewUser);

  router.post("/delete-user", homeController.deleteUser);
  router.get("/edit-user/:userId", homeController.editUser);
  router.post("/update-info-user", homeController.updateUser);

  router.get("/upload", homeController.getUploadFilePage);
  router.post("/upload-profile-pic", homeController.handleUploadFile)
  return app.use("/", router);
};

export default initWebRoute;
