import styles from '../../../styles/characters.module.css'
import { Button, Card, Loader} from 'semantic-ui-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const FilteredCharacters = ({characters}) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
      setIsLoading(!isLoading);
  }, [characters])

  const router = useRouter();

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
                let path = '/character/'+ ch.id;
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
                            query: { favorite: false }
                         })}>View</Button>
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

    let characters = [];
    if (returnJson.error) {
      return { props: {characters} }
    }

    let {info: {pages, next}, results} = returnJson
    characters = characters.concat(results);

    if (pages === 1 || next === null) {
        return { props: {characters} }
    } else {
        return (async ()=> {
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
            return { props: {characters} }
        })(); 
    }
}

export default FilteredCharacters;