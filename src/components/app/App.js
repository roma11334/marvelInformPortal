import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage, Page404, SinglePage, SingleComicPage, SingleCharacterPage } from "../pages";


const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/comics" element={<ComicsPage />} />
            <Route path="/comics/:id" element={<SinglePage Component={SingleComicPage} dataType="comic" />}/>
            <Route path="/characters/:id" element={<SinglePage Component={SingleCharacterPage} dataType="character" />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
