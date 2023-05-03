import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import AppBanner from "../appBanner/AppBanner"
import decoration from '../../resources/img/vision.png';
import {useState } from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import PropTypes from 'prop-types';
import ComicsList from "../comicsList/ComicsList";

const App = () => {

    const [selectedChar, setChar] = useState(null)
    
    const onCharSelected = (id) => {
        setChar(id)
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/* <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/> */}
                <AppBanner/>
                <ComicsList/>
            </main>
        </div>
    )
}

App.propTypes = {
    onCharSelected: PropTypes.array
}

export default App;