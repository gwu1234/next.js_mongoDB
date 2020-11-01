import ModelCharacters from "../models/Characters"

async function fetchDataFromMongo() {
    console.log ("fetching data at fetchDataFromMongo")
    try { 
          const characters = await ModelCharacters.find({});
          console.log("fetchDataFromMongo return character length", characters.length)
          return characters
    } catch (error) {
          console.log(error)
          return []
    }
    //return []
}

export default fetchDataFromMongo