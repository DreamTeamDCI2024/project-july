import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Header from './Components/Header/Header';

import Shop from './Pages/Shop';


//import Shop from './Pages/Shop';
import About from './Pages/About';
import Products from './Pages/Products';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Cart from './Pages/Cart';
import Homepage from './Pages/Homepage';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>

        <Route path='/' element={<Shop/>}/>
        <Route path='/contact' element={<Contact/>}/>

        <Route path='/' element={<Homepage/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/cart' element={<Cart/>}/>


      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
