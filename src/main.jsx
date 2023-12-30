import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import CardDetail from './components/MovieDetail/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path='/:id' element={<CardDetail/>} />
    </Routes>
  </BrowserRouter>,
)
