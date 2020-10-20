import { useState } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader, Icon } from 'semantic-ui-react';
import styles from '../../../styles/character.module.css'

const Character = ({ character, favorite, comment }) => {
    const {origin, location, episode, image, url, created} = character;
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    if (favorite ===true || favorite ==="true") {
        favorite = true;
    } else {
        favorite = false
    }
        
    const openDelete = () => {
        setConfirm(true);
        setIsDeleting(true);
    }

    const openFavorite = () => {
        setConfirm(true);
    }

    const unFavorite = () => {
        setConfirm(true);
    }

    const close = () => setConfirm(false);

    const deleteCharacter = async () => {
        try {
            const deleted = await fetch(`http://localhost:3000/api/character/${character.id}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(character)
            });

            if (!favorite) {
                 router.push("/character");
            }

        } catch (error) {
            console.log(error)
        }

        if (favorite) {
            removeFavorite()
        }
    }

    const createFavorite = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/character', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(character)
            })
            router.push("/favorite");
        } catch (error) {
            console.log(error);
        }
    }

    const removeFavorite = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/character', {
                method: 'DELETE',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(character)
            })
            router.push("/favorite");
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        deleteCharacter()
        close();
        setIsDeleting(false);
    }

    const handleFavorite = async () => {
        if (favorite) { 
            removeFavorite();
            close();
        } else {
            createFavorite();
            close();
        }
    }

    return (
        <div className={styles.container}>
            {isDeleting
                ? <Loader active />
                :
                <>
                    <div className ={styles.menu}>
                        <h3>name&nbsp;:&nbsp;&nbsp;{character.name}</h3>
                        <p>id&nbsp;:&nbsp;&nbsp;{character.id}</p>
                        <p>status&nbsp;:&nbsp;&nbsp;{character.status}</p>
                        <p>species&nbsp;:&nbsp;&nbsp;{character.species}</p>
                        <p>type&nbsp;:&nbsp;&nbsp;{character.type}</p>
                        <p>gender&nbsp;:&nbsp;&nbsp;{character.gender}</p>                       
                    </div>
                    <div className ={styles.menu}>
                        <h3>origin</h3>
                        <p>name&nbsp;:&nbsp;&nbsp;{origin.name}</p>
                        <p>url&nbsp;:&nbsp;&nbsp;{origin.url}</p>                     
                    </div>
                    <div className ={styles.menu}>
                        <h3>location</h3>
                        <p>name&nbsp;:&nbsp;&nbsp;{location.name}</p>
                        <p>url&nbsp;:&nbsp;&nbsp;{location.url}</p>                     
                    </div>
                    <div className ={styles.menu}>
                        <h3>image</h3>
                        <img src={image} alt={character.name}></img>                    
                    </div>
                    <div className ={styles.menu}>
                        <h3>episode</h3>
                        {episode.map((ep, index) => {          
                            return (
                                <div key ={ep+index}>
                                    <a href={ep}>{ep}</a>
                                </div>
                            )})}                     
                    </div>
                    <div className ={styles.menu}>
                        <p>url&nbsp;:&nbsp;&nbsp;{url}</p>
                        <p>created&nbsp;:&nbsp;&nbsp;{created}</p>                     
                    </div>
                    <div className ={styles.menu}>  
                        <div className ={styles.icon}>  
                            <div>               
                                 <h3> Comments:</h3>
                                 <p>  click + to add new comment</p>
                            </div>
                            <Icon name="plus" color="blue" size ="large" 
                                  onClick = {()=>{
                                      let path = `/character/${character.id}/newComment`;
                                      router.push({
                                        pathname: path,
                                        query: { id: character.id ,
                                                 name: character.name,
                                                 _id: comment ? comment._id: undefined,
                                                 commentString: JSON.stringify({comment})
                                        }
                                      })
                                  }}>
                            </Icon>
                        </div>
                        <div className ={styles.comments}>
                            {comment && <p>Character Id : &nbsp; &nbsp; {comment.id}</p>}
                            {comment && <p>Character Name: &nbsp; &nbsp; {comment.name}</p>}
                            {comment  && comment.comments.length > 0  && comment.comments.map((c, index)=>{ 
                                return (
                                    <div className={styles.comment} key={index}>
                                        <p>commented by : </p>
                                        <p>id : &nbsp; {c.by.id} &nbsp; &nbsp;&nbsp; &nbsp;name : &nbsp; {c.by.name}</p>
                                        <div className={styles.content}>{c.comment}</div>
                                    </div>
                                )})}
                        </div>                                        
                    </div>
                    <Button color='red' onClick={openDelete}>Delete</Button>
                    {favorite ? <Button color='green' onClick={unFavorite}>UnFavor</Button>
                              : <Button color='green' onClick={openFavorite}>Favorite</Button>
                    }
                </>
            }
            <Confirm
                open={confirm}
                onCancel={close}
                content = {isDeleting ? "do you want delete this character permanently ?" :
                            (favorite ? "do you want remove this character from your favorite list ?"
                                      : "do you want add this character to your favorite list"
                            )}
                onConfirm={isDeleting? handleDelete: handleFavorite}
            />
        </div>
    )
}

export async function getServerSideProps({ query: { id, favorite} }) {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    let character = await res.json();
    
    const res_comment = await fetch(`http://localhost:3000/api/character/${id}/comment`)
    let {success, data : comments} = await res_comment.json();
    let comment = null
    if (success === "true" || success === true) {
         comment = comments.filter(com => com.id===parseInt(id))[0] || null
    } 
    return { props: {character, favorite, comment} }    
}

export default Character;