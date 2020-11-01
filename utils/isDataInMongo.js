import ModelCharacters from "../models/Characters"
import mongoConnect from "./mongoConnect"

async function isDataInMongo() {
    try {
        console.log ("at isDataInMongo")
        mongoConnect()
        let favorites = await ModelCharacters.find({ id: { $lt: 100 }}, '_id, id, cached', (err, docs) =>{
                if (err) console.log(err.name)
                else  console.log("isDataInMongo found docs size :", docs.length)
               });
        if (!favorites[0] || !favorites [0].cached) {
                console.log ("no cache data in mongoDB existed")
                return false 
        } else {
                let cached = favorites[0].cached 
                console.log ("cached  = ", cached)
                let current = Date.now() 
                // if less than 24 hour old
                if (current-cached < 1000*60*60*24) {
                    console.log("valid data in mongoDB ")
                    return true
                } else {
                    return false
                }
        }          
    } catch (err) {
            console.log("error handler character/index.js favorites")
            console.log (err.message)
            return false
    }
}

export default isDataInMongo