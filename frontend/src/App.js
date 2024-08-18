import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Header from './Components/Header/Header';
import Shop from './Pages/Shop';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
