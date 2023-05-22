import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';
import setContent from '../../utils/setContent';

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams()

    const [data, setData] = useState(null)
    const {getOneComics, getCharacter, process, setProcess} = useMarvelService()

    useEffect(() => {
        onDataLoaded()
    }, [id])

    const onDataLoaded = () => {
        // eslint-disable-next-line default-case
        switch(dataType){
            case 'comic':
                getOneComics(id).then(onSetData).then(() => setProcess('confirmed')) 
                break
            // eslint-disable-next-line no-fallthrough
            case 'character':
                getCharacter(id).then(onSetData).then(() => setProcess('confirmed'))
        }
        
    }

    const onSetData = (char) => {
        setData(char)
    } 

   

    return ( 
        <>
            <AppBanner/>
            {setContent(process, Component, data)}
        </>
    )
}

export default SinglePage;