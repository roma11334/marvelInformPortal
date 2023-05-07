import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMesage';
import { Link } from 'react-router-dom';

const ComicsList = () => {

    const [char, setChar] = useState([])
    const [offset, setOffset] = useState(210)
    
    const {getComics, loading, error, clearError} = useMarvelService()

    useEffect(() => {
        updateComics()
    },[])

    const updateComics = () => {
        clearError()
        getComics(offset).then(updateChar)
    }

    const updateChar = (newChar) => {
        if(char.length < 8){
            setChar([])
        }
        setChar(char => [...char, ...newChar])
        setOffset(offset => offset + 8)
    }
    const list = () => {
        return(
            <ul className="comics__grid">
                {char.map((item, i) => {
                    const {id, title, price, thumbnail} = item
                    return (
                    <li className="comics__item" key={i}>
                        <Link to={`/comics/${id}`}>
                            <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                            <div className="comics__item-name">{title}</div>
                            <div className="comics__item-price">{price}$</div>
                        </Link>
                    </li>
                    )  
                })}
            </ul>
        )
    }
    const newList = list()
    const errorMes = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    return (
        <div className="comics__list">
            {errorMes}
            {newList}
            {spinner}
            <button onClick={() => updateComics()} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;