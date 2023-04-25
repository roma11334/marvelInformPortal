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
    spinner: true,
    offset: 1550,
    newItem: false,
    charEnded: false
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.onUpdateChar()
  }

  onUpdateChar = (offset) => {
    this.setState({newItem:true})
    this.marvelService
        .getAllCharacters(offset)
        .then(this.onCharLoaded)
        .catch(this.onErrorLoaded)
  }

  // onUpdateLoaded = (char) => {
  //   this.setState({
  //     char: [...this.state.char, ...char]
  //   })
  //   console.log(this.state.char)
  // }

  onCharLoaded = (newChar) => {
    if(newChar.length < 9){
      this.setState({charEnded:true})
    }
    this.setState(({char, offset}) => ({
      char:[...char, ...newChar],
      spinner: null,
      newItem: false,
      offset: offset + 9
    }));
  };

  onErrorLoaded = (error) => {
    this.setState({error, spinner:null})
  }

  list = () => {
    const {char, offset, newItem, charEnded} = this.state
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
          <button style={{'display': charEnded ? 'none' : 'block'}} disabled={newItem} onClick={() => this.onUpdateChar(offset)} className="button button__main button__long">
            <div className="inner">load more</div>
          </button>
        </div>
    )
  }

  render() {
    
    const { error, spinner } = this.state;
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
