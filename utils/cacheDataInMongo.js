import Characters from "../models/Characters"

async function cacheDataInMongo(data) {
    console.log ("caching data at cacheDataInMongo")
    try { 
          await Characters.updateMany(null, data, {upsert: true})
          return true
    } catch (error) {
          console.log(error)
          return []
    }
    return false 
}

export default cacheDataInMongo