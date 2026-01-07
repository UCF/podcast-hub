import './App.scss'

import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';

import HubView from './views/HubView';
import Footer from './components/Footer';
import Category from './views/CategoryView';
import NotFoundView from './views/NotFound';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index={true} element={<HubView />} />
        <Route path='/category/:category' element={<Category />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
