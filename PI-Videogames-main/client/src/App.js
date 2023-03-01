import './App.css';
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./views/Landing Page/Landing";
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import Form from "./views/Form/Form";
import NavBar from './components/NavBar/NavBar';


function App() {
  const location = useLocation();

  return (
    <div>
      <div>
        {location.pathname !== "/" && <NavBar />}
      </div>
      <div>
        <Routes>
          <Route exact path="/" element={<Landing/>} />
          <Route path="/videogames" element={<Home/>} />
          <Route path="/form" element={<Form/>} />
          <Route path="/videogames/:id" element={<Detail/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

//<Route exact path="/" component="Landing" />
//{location.pathname !== "/" && <NavBar />}

      // <Route exact path="/" render={() => <Landing/>} />
      // <Route path="/home" render={() => <Home/>}/>
      // <Route path="/detail" render={() => <Detail/>}/>
      // <Route path="/form" render={() => <Form/>}/>