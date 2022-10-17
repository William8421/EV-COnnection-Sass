import { Router } from "express";
import { getCoordinates } from "../controllers/mapControlles.js";

const mapRouter = Router();
  
mapRouter.post("/getCoordinates", getCoordinates)


export default mapRouter;
