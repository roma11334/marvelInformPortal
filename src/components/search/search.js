import './search.scss'
import useMarvelService from "../../services/MarvelService";
import { useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { Link } from 'react-router-dom';

const Search = () => {

  const [char, setChar] = useState(null)
  const [status, setStatus] = useState('')
  const [color, setColor] = useState('')
  const [id, setId] = useState(null)

  const validate = values => {
    const errors = {}
    if(!values.name){
      errors.name = 'Обязательное поле!'
      setStatus('This field is required')
      setId(null)
      setColor('red')
    }
    return errors
  }

  const {loading, error, getNameCharacter} = useMarvelService()

  const onSearch = (values) => {
    getNameCharacter(values.name)
        .then(onSearchLoaded)
        .catch(onError)
  }

  const onError = (error) => {
    setStatus('The character was not found. Check the name and try again')
    setId(null)
    setColor('red')
  }

  const onSearchLoaded = (name) => {
    setStatus(`There is! Visit ${name.name} page?` )
    setId(name.id)
    setChar(name)
    setColor('green')
  }

  return (
    <Formik 
        initialValues = {{
          name: ''
        }}
        validate={validate}
        onSubmit = {values =>{

          onSearch(values)

        }} >

      <Form className="search">
        <h3>Or find a character by name:</h3>
        <Field 
            name="name" 
            type="text" 
            placeholder='Enter name' />
        <button type='submit' className='button button__main'>
          <div className="inner">FIND</div>
        </button>
        {/* <ErrorMessage name="name" style={{'color':'red'}} component="div"/> */}
        <div className='topage'>
          {status ? <h3 style={{'color':`${color}`}} className='status'>{status}</h3> : null}
          {id ? 
            <Link to={`characters/${char.id}`} className='button button__main page'>
                <div className="inner">TO PAGE</div>
            </Link> : null}
        </div>
      </Form>
    </Formik>
    
  ) 
};

export default Search;
