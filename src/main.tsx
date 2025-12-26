import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
//import '@picocss/pico/css/pico.min.css';
import '@flaticon/flaticon-uicons/css/solid/rounded.css'
import '@flaticon/flaticon-uicons/css/brands/all.css'
import './index.css'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
