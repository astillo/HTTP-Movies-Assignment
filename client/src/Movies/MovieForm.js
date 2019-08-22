import React from 'react'
import { Form as Formik, Field, withFormik } from 'formik'
import { Segment, Form, Button } from 'semantic-ui-react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const MovieForm = props => {
    const putForm = e => {
        e.preventDefault()
    }
    console.log(props.match.params.id)
    return(
        <Segment rasied compact>
            <Form>
                <Formik>
                    <Form.Field>
                        <Field type="text" name="title" placeholder="Title" />
                    </Form.Field>
                    <Form.Field>
                        <Field type="text" name="director" placeholder="Director" />
                    </Form.Field>
                    <Form.Field>
                        <Field type="text" name="score" placeholder="MetaScore" />
                    </Form.Field>
                    <Form.Field>
                        <Field type="text" name="star1" placeholder="Stars in Movie" />
                    </Form.Field>
                    <Form.Field>
                        <Field type="text" name="star2" placeholder="Stars in Movie 2" />
                    </Form.Field>
                    <Button type="submit">Submit</Button>
                </Formik>
            </Form>
        </Segment>
    )
}
const FormikForm = withFormik({
    mapPropsToValues(values, props){
        console.log(values.match.params.id)
        return{
            id: values.match.params.id,
            title: values.title,
            director: values.director,
            metascore: values.score,
            stars:[values.star1, values.star2]
            //ASK WILL IF THERE IS A MORE ELEGANT WAY TO DO THIS
        }
    },
    handleSubmit(values, props){
        console.log(values)
        axios.put(`http://localhost:5000/api/movies/${props.props.match.params.id}`, {...values, metascore:values.score})
        .then(res=> {
            props.props.history.push(`/movies/${props.props.match.params.id}`)
        } ).catch(err=>console.log(err))
    }
})(MovieForm)

export default FormikForm;