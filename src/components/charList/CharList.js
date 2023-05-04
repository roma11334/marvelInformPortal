import "./charList.scss";
import { useState, useEffect, useRef } from "react";
import useMarvelService from "../../services/MarvelService";
import { beautifulImg } from "../randomChar/RandomChar";
import ErrorMessage from "../errorMessage/errorMesage";
import Spinner from "../spinner/spinner"


const CharList = (props) => {
  const [char, setChar] = useState([])
  const [offset, setOffset] = useState(1450)
  const [newItem, setNewItem] = useState(false)
  const [charEnded, setCharEnded] = useState(false)
  
  const {loading, error, getAllCharacters} =  useMarvelService();
  const myRef = useRef([])

  useEffect(() => {
    onUpdateChar(offset, true)
  }, [])


  const onUpdateChar = (offset, initial) => {
    initial ? setNewItem(false) : setNewItem(true)
    getAllCharacters(offset)
        .then(onCharLoaded)
  }

  const onCharLoaded = (newChar) => {
    let ended = false;
    if(newChar.length < 9){
      ended = true
      setCharEnded(true)
    }
    if (char.length < 9){
      setChar([])
    }
    setChar(char => [...char, ...newChar])
    setNewItem(false)
    setOffset(offset => offset + 9)
    setCharEnded(charEnded => ended);
  };


  const onSetRef = (i) => {
    myRef.current.forEach(item => {
      item.classList.remove('char__item_selected')
    })
    myRef.current[i].classList.add('char__item_selected')
  }

  const list = (charList) => {
    return (
          <ul className="char__grid">
              {charList.map((item,i) =>{
                  return(
                      <li
                      ref = {el => myRef.current[i] = el}
                      key={i} 
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
          
    )
    
  }

    
    const newList = list(char)
    const errorMes = error ? <ErrorMessage/> : null
    const spinnerMes = loading && !newItem ? <Spinner/> : null
    return (
      <div className="char__list">
        {errorMes}
        {spinnerMes}
        {newList}
        <button style={{'display': charEnded ? 'none' : 'block'}} disabled={newItem} onClick={() => onUpdateChar(offset)} className="button button__main button__long">
            <div className="inner">load more</div>
          </button>
        </div>
    );
}



export default CharList;
