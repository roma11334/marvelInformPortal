import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

const RandomChar = () => {
    
    const [char, setChar] = useState({})
    const {getCharacter, clearError, process, setProcess} = useMarvelService() 
    
    useEffect(() => {
        updateChar()
    },[])

    const onTryIt = () => {
        updateChar()
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updateChar = () => {
        clearError()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

        return (
            <div className="randomchar">
                {setContent(process, View, char)}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={onTryIt} className="button button__main">
                        <div  className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
}

const beautifulDesc = (str) => {
    if(!str){
        str = 'We have no information about this hero.'
    } else if(str.length > 200){
        str = str.slice(0,200) + '...'
    }
    return str
}

//Есть проблема когда нет картинки эта заглушка плохо ложиться и приходиться менять стили)
const beautifulImg = (img) => {
    if(img === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        return {
            objectFit:'fill',
        } 
    }
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki} = data
    const newDesc = beautifulDesc(description)
    return (
        <div className="randomchar__block">
                
                     <img src={thumbnail} alt="Random character" className="randomchar__img" style={beautifulImg(thumbnail)}/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {newDesc}
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div> 
                </div>
    )
    
}

export {beautifulImg}
export {beautifulDesc}
export default RandomChar;