import UserDAO from "../dao/userDAO.js";

export default class UserCtrl {
    static async UserPutAPI(req, res,_) {
        let cursor = await UserDAO.signup({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            country: req.body.country,
            interests: req.body.interests,
            activeGigs: [],
            appliedGigs: [],
            pastGigs: [],
            postedJobs: [],
            previousJobs: [],
            activeJobs: [],
            linkedin: req.body.interests,
            mobile: req.body.mobile,
            profilePicture: req.body.profilePicture
        })
        res.json(cursor)
    }

    static async UserGetAPI(req,res,_){
        let cursor
        switch (req.query.type) {
            case "Login":
                cursor = await UserDAO.login({
                    name : req.query.details[0],
                    password : req.query.details[1]
                })
                break;
            case "Fetch":
                cursor = await UserDAO.fetch(
                    req.query.cookie,req.query.fields
                )
                break;
            default:
                cursor = {status : "Mention The Request Type"}
                break;
        }

        res.json(cursor)
    }
}