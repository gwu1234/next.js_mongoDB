import Characters from "../models/Characters"

async function fetchDataFromMongo() {
    console.log ("fetching data at cacheDataInMongo")
    try { 
          const data = await Characters.find({});
          return data[0].characters
    } catch (error) {
          console.log(error)
          return false
    }
    return false 
}

export default fetchDataFromMongo