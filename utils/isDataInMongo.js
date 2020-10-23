import Characters from "../models/Characters"

async function isDataInMongo() {
    try {
        console.log ("at isDataInMongo")
        const character = await Characters.find({ id: { $lt: 100 }}, '_id, id, cached', (err, docs) =>{
        //const character = await Characters.find(null, '_id, id, cached', (err, docs) =>{
            if (err) {
                console.log(err.name)
            } else {
                console.log("docs size :", docs.length)
            }
        });
        
        if (!character[0] || ! character[0].cached) {
            console.log ("no data existed")
            return false 
        } else {
            let cached = character[0].cached 
            console.log ("cached  = ", cached)
            let current = Date.now() 
            // if less than 24 hour old
            if (current-cached < 1000*60*60*24) {
                console.log("valid data in mongoDB ")
                return true
            }
            return false
        }
    } catch (error) {
        console.log (error)
    }
    return false 
}

export default isDataInMongo