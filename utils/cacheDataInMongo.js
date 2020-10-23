import Characters from "../models/Characters"

/*var newvalues = { $set: {name: "Mickey", address: "Canyon 123" } };
  dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});*/

async function cacheDataInMongo(character) {
    //console.log (`caching data at cacheDataInMongo for id ${character.id}`)
    try { 
          //await Characters.updateMany(null, data, {upsert: true})
          //let newvalue = { $set: {character} };
          await Characters.findOneAndReplace({ id: character.id }, character, {upsert: true}, (err, res)=>{
               if (err) {
                   console.log(err.name)  
                   console.log (`updating failed for id ${character.id}`)
               } else {
                   console.log(`updated for id ${character.id}`)
               }
          });

          //await Characters.updateMany(null, character, {upsert: true});
          //await Characters.findOneAndUpdate({ id: character.id }, character, {upsert: true})
          return true
    } catch (error) {
          console.log(error)
          return []
    }
    return false 
}

export default cacheDataInMongo