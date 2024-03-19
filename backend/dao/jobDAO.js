import jwt from "jsonwebtoken"
import mongodb from "mongodb"

const ObjectId = mongodb.ObjectId
let jobDB

export default class JobDAO{
    static async injectDB(conn) {
        if (jobDB) {
            return
        }
        try {
            jobDB = await conn.db(process.env.JOB_DB).collection("Jobs")
        } catch (e) {
            console.error(
                `Unable to establish collection handle in JobDAO : ${e}`
            )
        }
    }


    static async fetch(cookie,jobID, fields){
        let job
        let isOwner
        try{
            job = await jobDB.find({"_id":new ObjectId(jobID)}).toArray()
            let userId = jwt.verify(cookie,process.env.PRIVATE_KEY).id
            isOwner = userId == job[0]["owner"]
        }
        catch (e){
            console.log(e)
            return {status : "Invalid JobID/Cookie"}
        }

        try{
            let data = []
            fields.forEach(transform)

            async function transform(value,index,array){
                if(value == "isOwner"){
                    data.push(isOwner ? "/employee/jobs/postjob" : "/employee/jobs/readmore")
                }
                else data.push(job[0][value])
            }
            
            console.log(data)
            return {status : "Succesful",fields : data}
        }
        catch (e){
            console.log(e)
            return {status : "Invalid Fields"}
        }    
    }
}