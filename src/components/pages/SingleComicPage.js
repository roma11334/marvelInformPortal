import './singleComicPage.scss';
import xMen from '../../resources/img/x-men.png';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMesage';
import AppBanner from '../appBanner/AppBanner';

const SingleComicPage = () => {
    const {comicId} = useParams()

    const [comic, setComic] = useState()
    const {loading, error, getOneComics} = useMarvelService()

    useEffect(() => {
        onComicLoaded()
    }, [])

    const onComicLoaded = () => {
        getOneComics(comicId).then(onSetComic)
    }

    const onSetComic = (char) => {
        setComic(char)
    } 

    console.log(comic)

    const loadingMsg = loading ? <Spinner/> : null
    const errorMsg = error ? <ErrorMessage /> : null
    const content = !(loading || error || !comic) ? <View comics={comic}/> : null

    return ( 
        <>
            <AppBanner/>
            {errorMsg}
            {loadingMsg}
            {content}
        </>
    )
}

const View = ({comics}) => {
    const {desc, title, price, thumbnail, page} = comics
    return(
        <div className="single-comic">
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{desc}</p>
                <p className="single-comic__descr">{page} pages</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <Link to={'../comics'} className="single-comic__back">Back to all</Link>
        </div>

    )
}

export default SingleComicPage;