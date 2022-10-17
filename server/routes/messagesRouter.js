import { Router } from "express";

import { getConversations, getAllComments,getReviews ,addAComment, addAReview, addADirectMsg, getDirectMsgs } from "../controllers/messagesControllers.js";
  
  
  const messagesRouter = Router();
  
  
  messagesRouter.get("/getAllComments", getAllComments)
  messagesRouter.post("/addAComment", addAComment)
  messagesRouter.post("/addAReview", addAReview)
  messagesRouter.post("/getReviews", getReviews)

  messagesRouter.post("/addADirectMsg", addADirectMsg)
  messagesRouter.post("/getDirectMsgs", getDirectMsgs)
  messagesRouter.post("/getConversations", getConversations)



  
  
  export default messagesRouter;
  