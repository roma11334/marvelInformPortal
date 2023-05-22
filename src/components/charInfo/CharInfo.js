import './charInfo.scss';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import { beautifulDesc } from '../randomChar/RandomChar';
import { beautifulImg } from '../randomChar/RandomChar';
import PropTypes from 'prop-types';
import setContent from '../../utils/setContent';

const CharInfo = (props) => {
    const [char, setChar] = useState(null)

    const {getCharacter, clearError, process, setProcess} = useMarvelService()

    const updateChar = () => {
        if(!props.charId){
            return
        }
        clearError()
        getCharacter(props.charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    } 
    
    useEffect(() => {
        updateChar()
    }, [props.charId])


    const onCharLoaded = (char) => {
        setChar(char)
      };

        return (
            <div className="char__info">
                {setContent(process, View, char)}
            </div>
        )
}

const View = ({data}) => {
    const {name, description, homepage, wiki, thumbnail, comics} = data
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