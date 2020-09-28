import { useState, useEffect } from 'react';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import styles from '../styles/filter.module.css'

const Filter = () => {
    const [form, setForm] = useState({name:'',status:'',species:'',type:'',gender:''});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createFilter();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const createFilter = async () => {
        const {name, status, species, type, gender} = form;
         
        let path = "/character";
        if (name) {
             path = path + "/" + name; 
        } else {
             path = path + "/nil";
        }

        if (status) {
            path = path + "/" + status; 
        } else {
            path = path + "/nil";
        }

        if (species) {
            path = path + "/" + species; 
        } else {
            path = path + "/nil";
        }

        if (type) {
            path = path + "/" + type; 
        } else {
            path = path + "/nil";
        }

        if (gender) {
            path = path + "/" + gender; 
        } else {
            path = path + "/nil";
        }
        router.push(path);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        console.log(errs);
        setErrors(errs);
        setIsSubmitting(true);
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value.trim()
        })
    }

    const validate = () => {
        console.log("validate()")
        let err = {};
        const {name, status, species, type, gender} = form;
        console.log("status = ", status)
        if (!name && !status && !species && !type && !gender) {
            err.name = 'fill at least one input';
        }
        if (status && status !=="alive" && status !=="dead" && status !=="unknown") {
            console.log ("invalid status")
            err.status= 'invalid status: only alive, dead and unknown allowed';
        }
        if (gender && gender !=="female" && gender !=="male" && gender !=="genderless" && gender !=="unknown") {
            console.log ("invlid gender")
            err.gender= 'invalid status: only female, male, genderless or unknown allowed';
        }
        console.log (err)
        return err;
    }
    
    return (
        <div className={styles.container}>
            <h1>Filter to Select Characters</h1>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid={true}
                                error={errors.name ? { content: errors.name, pointing: 'below' } : null}
                                label='name'
                                placeholder='name'
                                name='name'
                                onChange={handleChange}
                            />
                            <Form.Input
                                fluid={true}
                                label='status'
                                placeholder='status'
                                name='status'
                                error={errors.status ? { content: errors.status, pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                             <Form.Input
                                fluid={true}
                                label='species'
                                placeholder='species'
                                name='species'
                                onChange={handleChange}
                            />
                             <Form.Input
                                fluid={true}
                                label='type'
                                placeholder='type'
                                name='type'
                                onChange={handleChange}
                            />
                             <Form.Input
                                fluid={true}
                                label='gender'
                                placeholder='gender'
                                name='gender'
                                error={errors.gender ? { content: errors.gender, pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                            <Button type='submit'>Create</Button>
                        </Form>
                }
            </div>
        </div>
    )
}

export default Filter;