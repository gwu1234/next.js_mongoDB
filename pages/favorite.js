import styles from '../styles/characters.module.css'
import { Button, Card, Loader} from 'semantic-ui-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Favorites = ({characters}) => {
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
              Favorite List 
          </h3>
          <div className={styles.grid}>       
              {characters.map(ch => {
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
                            query: { favorite: true }
                         })}>View</Button>
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
    const res = await fetch(`http://localhost:3000/api/character`)
    let {success, data} = await res.json();
    let characters = [];
    if (success === "true" || success === true) {
        characters = characters.concat(data);
    } 
    return { props: {characters} }
}

export default Favorites;