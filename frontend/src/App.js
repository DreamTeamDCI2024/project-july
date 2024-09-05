import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Header from './Components/Header/Header';
import Shop from './Pages/Shop';
import Contact from './Pages/Contact';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
