import styles from '../../../styles/characters.module.css'
import { Button, Card, Loader} from 'semantic-ui-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const FilteredCharacters = ({characters}) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
      setIsLoading(!isLoading);
  }, [characters])

  let dataExist = characters.length > 0;

  return (
    <div className={styles.container}>
      {isLoading
        ? 
        <div className={styles.main}>
            <Loader active />
            <h3 className={styles.loader}>loading</h3>
        </div>
        :
        <main className={styles.main}>
          <h3 className={styles.title}>
              Filtered Character List 
          </h3>
          <div className={styles.grid}>       
              {dataExist && characters.map(ch => {
                let header = ch.id + " : " + ch.name
                return (
                  <div key={ch.id}>
                    <Card>
                      <Card.Content>
                        <Card.Header>
                          {header}
                        </Card.Header>
                      </Card.Content>
                      <Card.Content extra>
                        <Link href={`/character/${ch.id}`}>
                          <Button primary>View</Button>
                        </Link>
                        <Link href={`/character/${ch.id}/edit`}>
                          <Button primary>Edit</Button>
                        </Link>
                      </Card.Content>
                    </Card>
                  </div>
                )
              })}  
               {!dataExist && <div> 
                  <Card>
                     <Card.Content>                 
                          no characters of these features are found
                    </Card.Content>
                  </Card>
               </div>
               }        
          </div>
        </main>       
     }
    </div>
  )
}

export async function getServerSideProps({params:{param}}) {
    const [name,status,species,type,gender] = param;
    const base = 'https://rickandmortyapi.com/api/character/';
    let paramString = "";
    if (name !=="nil") {
        paramString += "?name="
        paramString += name
    }
    if (status !=="nil") {
        paramString += "&status="
        paramString += status
    }
    if (species !=="nil") {
        paramString += "&species="
        paramString += species
    }
    if (type !=="nil") {
        paramString += "&type="
        paramString += type
    }
    if (gender !=="nil") {
        paramString += "&gender="
        paramString += gender
    }

    let queryString = base + paramString;
    //console.log(queryString)

    const res = await fetch(queryString)
    let returnJson = await res.json();
    
    if (returnJson.error) {
      let characters=[];
      return { props: {characters} }
    }

    let {info: {pages, next}, results} = returnJson
    //console.log("pages = ", pages)
    //console.log("next = ", next)
    let characters = [];
    //console.log (results)
    characters = characters.concat(results);
    return { props: {characters} }
}

export default FilteredCharacters;