import './charInfo.scss';
import { useState, useEffect } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMesage';
import Spinner from '../spinner/spinner';
import Skeleton from '../skeleton/Skeleton'
import { beautifulDesc } from '../randomChar/RandomChar';
import { beautifulImg } from '../randomChar/RandomChar';
import PropTypes from 'prop-types';

const CharInfo = (props) => {
    const [char, setChar] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    

    const marvelService = new MarvelService()

    const updateChar = () => {
        if(!props.charId){
            return
        }
        onSpinnerLoaded()
        marvelService
            .getCharacter(props.charId)
            .then(onCharLoaded)
            .catch(onErrorLoaded)
    }
    
    useEffect(() => {
        updateChar()
    }, [props.charId])

    const onSpinnerLoaded = () => {
        setLoading(true)
    }

    const onCharLoaded = (char) => {
        setChar(char)
        setLoading(null)
      };
    
    const onErrorLoaded = (error) => {
        setError(error)
        setLoading(null)
    }

        const skeleton = (char || loading || error) ? null : <Skeleton/>
        const loadingMsg = loading ? <Spinner/> : null
        const errorMsg = error ? <ErrorMessage /> : null
        const content = (loading || error || !char) ? null : <View char={char} />
        return (
            <div className="char__info">
                {skeleton}
                {loadingMsg}
                {content}
                {errorMsg}
            </div>
        )
}

const View = ({char}) => {
    const {name, description, homepage, wiki, thumbnail, comics} = char
    const newDesc = beautifulDesc(description)  //Если описание слишком длинное мы его обрезаем
    return (
        <>
        <div className="char__basics"> 
                    <img style={beautifulImg(thumbnail)} src={thumbnail} alt="abyss"/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {newDesc}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length > 0 ? null : 'Sorry we have no comics' }
                    {comics.map((item, i) => {
                        if(i > 9) return
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })}
                    
                </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;