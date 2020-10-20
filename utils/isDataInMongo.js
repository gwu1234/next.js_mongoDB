import Characters from "../models/Characters"

async function isDataInMongo() {
    console.log ("at isDataInMongo")
    try {
        const created = await Characters.findOne(null, "created");  
        if (!created) {
            console.log ("no data existed")
            return false 
        } else {
            console.log ("created = ", created.created)
            let current = Date.now() 
            // if less than 24 hour old
            if (current-created.created < 1000*60*60*24) {
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