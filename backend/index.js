import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import UserDAO from "./dao/userDAO.js"
import JobDAO from "./dao/jobDAO.js"

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000
MongoClient.connect(process.env.DB_URL,
    {
        maxPoolSize : 50,
        wtimeoutMS: 9500,
        useNewUrlParser: true
    }
)
.catch(err => { 
    console.error(err.stack), 
    process.exit 
})
.then(async client => {
    await UserDAO.injectDB(client)
    await JobDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`listening on ${port}`)
    })

})