import ModelImage from "../models/Image"
import mongoConnect from "./mongoConnect"

async function cacheImageInMongo(url) {
    mongoConnect()
    //console.log (`cacheImageInMongo for url ${url}`)
    try { 
          console.log ("getting images from url ", url)
          const response = await fetch(url);
          const data  = await response.buffer();
          const name = /\d{1,}.jpeg$/.exec(url)[0]

          var image = {
            url: url, 
            name: name,
            img: {
                  data : data,
                  contentType: "image/jpeg",
             }
          }
    
          await ModelImage.findOneAndUpdate({ url: image.url }, image, {upsert: true}, (err, res)=>{
               if (err) {
                   console.log(err.name)  
                   console.log (`updating failed for image ${image.url}`)
               } else {
                   console.log(`updated for image ${image.url}`)
               }
          });
          return true
    } catch (error) {
          console.log(error)
          return false
    } 
}

export default cacheImageInMongo