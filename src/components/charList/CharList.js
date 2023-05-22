import "./charList.scss";
import { useState, useEffect, useRef, useMemo } from "react";
import useMarvelService from "../../services/MarvelService";
import { beautifulImg } from "../randomChar/RandomChar";
import ErrorMessage from "../errorMessage/errorMesage";
import Spinner from "../spinner/spinner"
import {CSSTransition,TransitionGroup} from 'react-transition-group';


const setContent = (process, Component, newItem) => {
  switch(process) {
      case 'waiting':
          return <Spinner/>
      case 'error':
          return <ErrorMessage/>
      case 'loading':
          return newItem ? <Component/> : <Spinner/>
      case 'confirmed':
          return <Component/>
      default:
          throw new Error('Unexpected process state')
  }
}


const CharList = (props) => {
  const [char, setChar] = useState([])
  const [offset, setOffset] = useState(1450)
  const [newItem, setNewItem] = useState(false)
  const [charEnded, setCharEnded] = useState(false)
  
  const {getAllCharacters, process, setProcess} =  useMarvelService();
  const myRef = useRef([])

  useEffect(() => {
    onUpdateChar(offset, true)
  }, [])


  const onUpdateChar = (offset, initial) => {
    initial ? setNewItem(false) : setNewItem(true)
    getAllCharacters(offset)
        .then(onCharLoaded)
        .then(() => setProcess('confirmed'))
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
            <TransitionGroup component={null}>
              {charList.map((item,i) => {
                  return(
                    <CSSTransition
                      timeout={(i * 300)}
                      classNames="item"
                      key = {i}>
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
                    </CSSTransition>
                  )
              } )}
            </TransitionGroup>
          </ul>
          
    )
  }
    const elements = useMemo(() => {
      return setContent(process, () => list(char), newItem)
    }, [process])

    return (
      <div className="char__list">
        {elements}
        <button style={{'display': charEnded ? 'none' : 'block'}} disabled={newItem} onClick={() => onUpdateChar(offset)} className="button button__main button__long">
            <div className="inner">load more</div>
          </button>
        </div>
    );
}



export default CharList;
