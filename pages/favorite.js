import styles from '../styles/characters.module.css'
import { Button, Card, Loader} from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ModelCharacter from '../models/Character';
import mongoConnect from '../utils/mongoConnect';

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
                ch = JSON.parse(ch)
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
    mongoConnect();
    try {
        console.log ("favorite.js fetching favorites")
        let characters = await ModelCharacter.find({}).exec();
        characters = characters.map (ch => JSON.stringify (ch))
        return { props: {characters: characters} }
    } catch (err) {
        console.log("error at favorite.js")
        console.log (err.message)
        return { props: {characters: []} }
    }
}

export default Favorites;