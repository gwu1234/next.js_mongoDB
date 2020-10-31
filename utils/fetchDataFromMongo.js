import Character from "../models/Character"

async function fetchDataFromMongo() {
    console.log ("fetching data at fetchDataFromMongo")
    try { 
          const characters = await Character.find({});
          return characters
    } catch (error) {
          console.log(error)
          return []
    }
    return []
}

export default fetchDataFromMongo