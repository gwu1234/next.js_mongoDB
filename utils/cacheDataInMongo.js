import ModelCharacters from "../models/Characters"
import mongoConnect from "./mongoConnect"

async function cacheDataInMongo(character) {
    mongoConnect()
    console.log (`caching data at cacheDataInMongo for id ${character.id}`)
    try { 
          await ModelCharacters.findOneAndUpdate({ id: character.id }, character, {upsert: true}, (err, res)=>{
               if (err) {
                   console.log(err.name)  
                   console.log (`updating failed for id ${character.id}`)
               } else {
                   console.log(`updated for id ${character.id}`)
               }
          });
          return true
    } catch (error) {
          console.log(error)
          return false
    } 
}

export default cacheDataInMongo