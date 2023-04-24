import "./charList.scss";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import { beautifulImg } from "../randomChar/RandomChar";
import ErrorMessage from "../errorMessage/errorMesage";
import Spinner from "../spinner/spinner"


class CharList extends Component {
  state = {
    char: [],
    error: null,
    spinner: true
  };

  componentDidMount() {
    this.marvelService
        .getAllCharacters()
        .then(this.onCharLoaded)
        .catch(this.onErrorLoaded)
  }

  marvelService = new MarvelService();

  onCharLoaded = (char) => {
    this.setState({ char, spinner:null });
  };

  onErrorLoaded = (error) => {
    this.setState({error, spinner:null})
  }

  list = () => {
    const {char} = this.state
    return (
      <div className="char__list">
          <ul className="char__grid">
              {char.map(item =>{
                  return(
                      <li key={item.id} onClick={() => this.props.onCharSelected(item.id)} className="char__item">
                          <img  src={item.thumbnail} alt="abyss" style={beautifulImg(item.thumbnail)} />
                          <div className="char__name">{item.name}</div>
                      </li>
                  )
              } )}
          </ul>
          <button className="button button__main button__long">
            <div className="inner">load more</div>
          </button>
        </div>
    )
  }

  render() {
    
    const { char, error, spinner } = this.state;
    const newList = this.list()
    const errorMes = error ? <ErrorMessage/> : null
    const spinnerMes = spinner ? <Spinner/> : null
    const list = !(error || spinner) ? newList : null
    return (
      <>
        {errorMes}
        {spinnerMes}
        {list}
      </>
    );
  }
}



export default CharList;
