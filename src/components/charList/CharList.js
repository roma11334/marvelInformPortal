import "./charList.scss";
import { useState, useEffect, useRef } from "react";
import MarvelService from "../../services/MarvelService";
import { beautifulImg } from "../randomChar/RandomChar";
import ErrorMessage from "../errorMessage/errorMesage";
import Spinner from "../spinner/spinner"


const CharList = (props) => {
  const [char, setChar] = useState([])
  const [error, setError] = useState(null)
  const [spinner, setSpinner] = useState(true)
  const [offset, setOffset] = useState(1550)
  const [newItem, setNewItem] = useState(false)
  const [charEnded, setCharEnded] = useState(false)
  
  const marvelService = new MarvelService();
  const myRef = useRef([])

  

  useEffect(() => {
    onUpdateChar()
  }, [])


  const onUpdateChar = (offset) => {
    setNewItem(true)
    marvelService
        .getAllCharacters(offset)
        .then(onCharLoaded)
        .catch(onErrorLoaded)
  }

  const onCharLoaded = (newChar) => {
    if(newChar.length < 9){
      setCharEnded(true)
    }
    setChar(char => [...char, ...newChar])
    setSpinner(null)
    setNewItem(false)
    setOffset(offset => offset + 9)
  };

  const onErrorLoaded = (error) => {
    setError(error)
    setSpinner(null)
  }

  const onSetRef = (i) => {
    myRef.current.forEach(item => {
      item.classList.remove('char__item_selected')
    })
    myRef.current[i].classList.add('char__item_selected')
  }

  const list = () => {
    return (
      <div className="char__list">
          <ul className="char__grid">
              {char.map((item,i) =>{
                  return(
                      <li
                      ref = {el => myRef.current[i] = el}
                      key={item.id} 
                      onClick={() => {
                        props.onCharSelected(item.id)
                        onSetRef(i)
                      } } 
                      className="char__item">
                          <img  src={item.thumbnail} alt="abyss" style={beautifulImg(item.thumbnail)} />
                          <div className="char__name">{item.name}</div>
                      </li>
                  )
              } )}
          </ul>
          <button style={{'display': charEnded ? 'none' : 'block'}} disabled={newItem} onClick={() => onUpdateChar(offset)} className="button button__main button__long">
            <div className="inner">load more</div>
          </button>
        </div>
    )
  }

    
    const newList = list()
    const errorMes = error ? <ErrorMessage/> : null
    const spinnerMes = spinner ? <Spinner/> : null
    const listt = !(error || spinner) ? newList : null
    return (
      <>
        {errorMes}
        {spinnerMes}
        {listt}
      </>
    );
}



export default CharList;
