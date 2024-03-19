import express from "express"
import UserCtrl from "./users.controller.js"
import JobCtrl from "./jobs.controller.js"

const router = express.Router();
router
    .route("/User")
    .post(UserCtrl.UserPutAPI)
    .get(UserCtrl.UserGetAPI)

router
    .route("/Jobs")
    .get(JobCtrl.JobGetAPI)
    
export default router