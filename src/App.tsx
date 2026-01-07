import './App.scss'

import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';

import HubView from './views/HubView';
import Footer from './components/Footer';
import Category from './views/CategoryView';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index={true} element={<HubView />} />
        <Route path='/category/:category' element={<Category />} />
        <Route path="*" element={<Navigate to="/404.html" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
