import bcrpyt from "bcrypt"
import jwt from "jsonwebtoken"
import mongodb from "mongodb"

const ObjectId = mongodb.ObjectId

let userDB
export default class UserDAO {
    static async injectDB(conn) {
        if (userDB) {
            return
        }
        try {
            userDB = await conn.db(process.env.USER_DB).collection("Users")
        } catch (e) {
            console.error(
                `Unable to establish collection handle in userDAO : ${e}`
            )
        }
    }

  
    static async signup(details) {
        let name = details["name"]
        let user = await userDB.find({name}).toArray()

        if(user.length){
            return {status : "User Already Exists"}
        }

        try{
            let hashCode = await bcrpyt.hash(details["password"],12)
            details["password"] = hashCode

            await userDB.insertOne(details)
        
            return {status : "Succesful"}
        }   catch(e){
            console.log(e)
            return {status : "Failed"}
        }
    }

    static async login(details) {
        let name = details["name"]
        let user = await userDB.find({name}).toArray()

        if(!user.length){
            return {status : "User Doesn't Exist"}
        }

        try{
            if(await bcrpyt.compare(details["password"],user[0]["password"])){
                let token = jwt.sign(
                    {id:user[0]["_id"]},
                    process.env.PRIVATE_KEY,
                    {expiresIn: '1h'}
                    )
                return {status : "Succesful", cookie : token}
            }

            return {status : "Incorrect Password"}
        }   catch(e){
            console.log(e)
            return {status : "Failed"}
        }
    }

    static async fetch(cookie,fields){
        let user
        try{
            let userId = jwt.verify(cookie,process.env.PRIVATE_KEY).id
            user = await userDB.find({_id:new ObjectId(userId)}).toArray();
        }
        catch (e){
            console.log(e)
            return {status : "Invalid Cookie"}
        }

        try{
            let data = []
            fields.forEach(transform)

            function transform(value,index,array){
                data.push(user[0][value])
            }
            
            return {status : "Succesful",fields : data}
        }
        catch (e){
            console.log(e)
            return {status : "Invalid Fields"}
        }
    }
}