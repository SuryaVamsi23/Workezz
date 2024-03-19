import JobDAO from '../dao/jobDAO.js'

export default class JobCtrl{
    static async JobGetAPI(req,res,_){
        let cursor
        switch (req.query.type) {
            case 'Fetch':
                cursor = await JobDAO.fetch(
                    req.query.cookie,req.query.jobID,req.query.fields
                )
                break;        
            default:
                cursor = {status: "Mention the request type"}
                break;
        }
        res.json(cursor)
    }
}