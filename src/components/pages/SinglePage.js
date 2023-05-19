import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMesage';
import AppBanner from '../appBanner/AppBanner';

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams()

    const [data, setData] = useState(null)
    const {loading, error, getOneComics, getCharacter} = useMarvelService()

    useEffect(() => {
        onDataLoaded()
    }, [id])

    const onDataLoaded = () => {
        // eslint-disable-next-line default-case
        switch(dataType){
            case 'comic':
                getOneComics(id).then(onSetData)  
                break
            // eslint-disable-next-line no-fallthrough
            case 'character':
                getCharacter(id).then(onSetData)
        }
        
    }

    const onSetData = (char) => {
        setData(char)
    } 

    const loadingMsg = loading ? <Spinner/> : null
    const errorMsg = error ? <ErrorMessage /> : null
    const content = !(loading || error || !data) ? <Component data={data}/> : null

    return ( 
        <>
            <AppBanner/>
            {errorMsg}
            {loadingMsg}
            {content}
        </>
    )
}

export default SinglePage;