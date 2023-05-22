import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMesage';
import { Link } from 'react-router-dom';

const setContent = (process, Component, char) => {
    switch(process) {
        case 'waiting':
            return <Spinner/>
        case 'error':
            return <ErrorMessage/>
        case 'loading':
            return char.length < 8 ? <Spinner/> : <Component/>
        case 'confirmed':
            return <Component/>
        default:
            throw new Error('Unexpected process state')
    }
  }

const ComicsList = () => {

    const [char, setChar] = useState([])
    const [offset, setOffset] = useState(210)
    
    const {getComics, loading, error, clearError, process, setProcess} = useMarvelService()

    useEffect(() => {
        updateComics()
    },[])

    const updateComics = () => {
        clearError()
        getComics(offset)
            .then(updateChar)
            .then(() => setProcess('confirmed'))
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

    return (
        <div className="comics__list">
            {setContent(process, () => list(char),  char)}
            <button onClick={() => updateComics()} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;