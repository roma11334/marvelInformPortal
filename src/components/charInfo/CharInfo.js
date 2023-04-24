import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMesage';
import Spinner from '../spinner/spinner';
import Skeleton from '../skeleton/Skeleton'
import { beautifulDesc } from '../randomChar/RandomChar';
import { beautifulImg } from '../randomChar/RandomChar';

class CharInfo extends Component {
    state = {
        char: null,
        loading: null,
        error: null
    }

    marvelService = new MarvelService()

    updateChar = () => {
        if(!this.props.charId){
            return
        }
        this.onSpinnerLoaded()
        this.marvelService
            .getCharacter(this.props.charId)
            .then(this.onCharLoaded)
            .catch(this.onErrorLoaded)
    }

    componentDidMount(){
        this.updateChar()
    }

    componentDidUpdate(prevProps){
        if (prevProps.charId !== this.props.charId){
            this.updateChar()
        }
        
    }

    onSpinnerLoaded = () => {
        this.setState({loading:true})
    }

    onCharLoaded = (char) => {
        this.setState({ char, loading:null });
      };
    
    onErrorLoaded = (error) => {
        this.setState({error, loading:null})
    }

    render(){
        const {char, loading, error} = this.state
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

export default CharInfo;