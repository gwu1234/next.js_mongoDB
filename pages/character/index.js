import styles from '../../styles/characters.module.css'
import { Button, Card, Loader, Icon} from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ModelFavorite from '../../models/Character';
import ModelDeleted from '../../models/Deleted';
import mongoConnect from '../../utils/mongoConnect';

//import isDataInMongo from "../../utils/isDataInMongo"
//import cacheDataInMongo from "../../utils/cacheDataInMongo"
//import fetchDataFromMongo from "../../utils/fetchDataFromMongo"


const Characters = ({characters}) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
      setIsLoading(!isLoading);
  }, [characters])

  const router = useRouter();

  return (
    <div className={styles.container}>
      {isLoading
        ? <div className={styles.main}>
             <Loader active />
             <h3 className={styles.loader}>loading</h3>
          </div>
        :
        <main className={styles.main}>
          <h3 className={styles.title}>
              All Character List 
          </h3>
          <div className={styles.grid}>       
              {characters.map(ch => {
                ch = JSON.parse(ch)
                //console.log ("ch id frontend = ", ch.id)
                let header = ch.id + " : " + ch.name
                let path = '/character/'+ ch.id;
                let isFavorite = ch.isFavorite === true || ch.isFavorite === "true"
                let isDeleted = ch.isDeleted && (ch.isDeleted===true || ch.isDeleted==="true")
                if (!isDeleted) {
                    return (
                      <div key={header}>
                        <Card>
                          <Card.Content>
                            <Card.Header>
                              {header}
                            </Card.Header>
                          </Card.Content>
                          <Card.Content extra>
                            <Button primary onClick ={()=>router.push({
                                pathname: path,
                                query: { favorite: isFavorite }
                              })}>View</Button>
                            {isFavorite  && <Icon name='favorite' color="red" size="large"></Icon>}
                          </Card.Content>
                        </Card>
                      </div>
                    )
                 }})}        
          </div>
        </main>
     }
    </div>
  )
}

export async function getServerSideProps() {
    //let mongoData = await isDataInMongo()
    //console.log("mongoData", mongoData)
    let characters = [];
    //if (!mongoData) {
    if (true) {
        console.log ("no valid data in mongo DB")
        const res = await fetch(`https://rickandmortyapi.com/api/character`)
        let {info: {pages, next}, results} = await res.json();
        characters = characters.concat(results);

        if (pages === 1 || next === null) {
            return { props: {characters} }
        } else {
            const getRemaining = async ()=> {
                let count = 1
                let nextPage = next
                do {
                      let res = await fetch(nextPage)
                      let {info: {next}, results} = await res.json();
                      count ++
                      characters = characters.concat(results);
                      nextPage = next
                }
                while (count <= pages && nextPage != null);
            } 
            await getRemaining();
        }
    } 
    { // block variable
          mongoConnect
          try {
              //console.log ("fetching favorites")
              let favorites = await ModelFavorite.find({});
              for (var ch of characters) {
                  ch.isFavorite = favorites.some(favorite => favorite.id===ch.id)
              }
          } catch (err) {
              console.log("error handler character/index.js favorites")
              console.log (err.message)
          }
    }
    { // block variable, and character/1 is for routing purpose, 1 is not an character id here 
      try {
          //console.log ("fetching Deleted Characters")
          let deleteds = await ModelDeleted.find({});
          if (deleteds && deleteds.length > 0) {
              for (var ch of characters) {
                 ch.isDeleted = deleteds.some(deleted => deleted.id===ch.id)
              }
          }
      } catch (err) {
          console.log("character/index.js fetching deleted")
          console.log(err.name)
      }
   } 
    characters = characters.map(ch=>JSON.stringify(ch))
    return { props: {characters} }
}

export default Characters;