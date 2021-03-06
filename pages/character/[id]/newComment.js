//import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import styles from '../../../styles/comment.module.css'


const NewComment = ({ }) => {
    const [form, setForm] = useState({ commenterId: '', commenterName: '', feedback: ""});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const {query : {id, name, _id, commentString}} = router;
    //console.log(id); // character id 
    //console.log(name);
    //console.log(_id) // mongoDB object id 
    let {comment: previous} = JSON.parse(commentString);
    //console.log ("previous =")
    //console.log(previous);

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createComment();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const createComment = async () => {
        
        let { commenterId, commenterName, feedback} = form;  
        const thisComment = {
            by: {  
                id: commenterId,
                name: commenterName    
            },
            created: "2020-09-29",
            comment: feedback
        }

        let combo =[]
        let method = "POST";
        let comment_id = id // first comment, no mongoDB object id, use character id 
        if (previous && Object.keys(previous).length > 0 ) {
            method = "PUT"
            comment_id = _id // use mongoDB object id for PUT updating 
            combo.push(thisComment)
            combo = combo.concat(previous.comments)
        } else {
            combo.push (thisComment)
        }
        
        let comments = {
            id: id,
            name: name,
            comments: combo
        }

        console.log (comments)
        setIsSubmitting(false)

        try {
            const res = await fetch(`http://localhost:3000/api/character/${comment_id}/comment`, {
                method: method,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comments)
            })
            router.push("/");

        } catch (error) {
            console.log(error);
        } 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validate = () => {
        let err = {};

        if (!form.commenterId) {
            err.commenterId = 'Commenter Id  is required';
        }
        if (!form.commenterName) {
            err.commenterName = 'Commenter Name required';
        }
        if (!form.feedback) {
            err.feedback = 'Comment required';
        }

        return err;
    }

    return (
        <div className={styles.container}>
            <h2>Create New Comment</h2>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <h4>Character Identification:</h4>
                            <Form.Input 
                                label='Character Id'
                                placeholder='character id'
                                name='id'
                                value ={id}
                            />
                            <Form.Input        
                                label='Character Name'
                                placeholder='character name'
                                name='name'
                                value ={name}
                            />
                            <h4>Commented By:</h4>
                            <Form.Input 
                                label='Commenter Id'
                                placeholder='commenter id'
                                name='commenterId'
                                error={errors.commenterId ? { content: 'Please enter id of commenter', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                            <Form.Input        
                                label='Commenter Name'
                                placeholder='commenter name'
                                name='commenterName'
                                error={errors.commenterName ? { content: 'Please enter name of commenter', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                            <Form.TextArea                               
                                label='comment'
                                placeholder='comment'
                                name='feedback'
                                error={errors.feedback ? { content: 'Please enter a comment', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                            <Button type='submit'>Create</Button>
                        </Form>
                }
            </div>
        </div>
    )
}

export default NewComment;