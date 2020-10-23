import Characters from "../models/Characters"

async function fetchDataFromMongo() {
    console.log ("fetching data at fetchDataFromMongo")
    try { 
          const characters = await Characters.find({});
          return characters
    } catch (error) {
          console.log(error)
          return []
    }
    return []
}

export default fetchDataFromMongo