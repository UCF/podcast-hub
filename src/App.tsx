import './App.scss'

import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';

import HubView from './views/HubView';
import Footer from './components/Footer';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index={true} element={<HubView />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
