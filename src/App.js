import './App.css';
import {Routes,Route} from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/'/> 
        <Route path='/about'></Route>
        <Route path='/food-donors'></Route>
        <Route path='/charities'></Route>
        <Route path='/volunteer'></Route>
        <Route path='/admin'></Route>
        <Route path='/contact'></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;