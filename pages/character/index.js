import styles from '../../styles/characters.module.css'
import { Button, Card, Loader, Icon} from 'semantic-ui-react';
//import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import isFavorite from '../../utils/isFavorites';
import isDeleted from '../../utils/isDeleted';

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
                let header = ch.id + " : " + ch.name
                let path = '/character/'+ ch.id;
                let isFavorite = ch.isFavorite === true || ch.isFavorite === "true"
                let isDeleted = ch.isDeleted && (ch.isDeleted===true || ch.isDeleted==="true")
                if (!isDeleted) {
                    return (
                      <div key={ch.id}>
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
    const res = await fetch(`https://rickandmortyapi.com/api/character`)
    let {info: {pages, next}, results} = await res.json();
    //console.log("pages = ", pages)
    //console.log("next = ", next)
    let characters = [];
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
        //return { props: {characters} }
    }

    { // block variable
      const res_favorite = await fetch(`http://localhost:3000/api/character`)
      let {success, data : favorites} = await res_favorite.json();
      //let favorites = [];
      if (success === "true" || success === true) {
          //favorites = favorites.concat(data);
          
          for (var ch of characters) {
            if (isFavorite (ch, favorites)){
                ch.isFavorite = true;
            }
          }
      } 
    }

    { // block variable, and character/1 is for routing purpose, 1 is not an character id here 
      const res_deleted = await fetch(`http://localhost:3000/api/character/1`)
      let {success, data : deleteds} = await res_deleted.json();
      //let deleteds = [];
      if (success === "true" || success === true) {
          //favorites = favorites.concat(data);
          
          for (var ch of characters) {
            if (isDeleted (ch, deleteds)){
                ch.isDeleted = true;
            }
          }
      }
   } 

    return { props: {characters} }
}

export default Characters;