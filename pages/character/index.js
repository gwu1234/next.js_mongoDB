import styles from '../../styles/characters.module.css'
import { Button, Card, Loader} from 'semantic-ui-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Characters = ({characters}) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
      setIsLoading(!isLoading);
  }, [characters])

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
              Character List 
          </h3>
          <div className={styles.grid}>       
              {characters.map(ch => {
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

export default Characters;