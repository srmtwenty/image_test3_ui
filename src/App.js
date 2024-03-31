import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Fetch from './components/Fetch';
import Options from './components/Options';
import Options2 from './components/Options2';
import ImageList from './pages/ImageList';
import ImageDetail from './pages/image/ImageDetail';
import ImagePost from './pages/image/ImagePost';
import PeopleList from './pages/PeopleList';
import PersonDetail from './pages/person/PersonDetail';
import PersonPost from './pages/person/PersonPost';
import ImagePost2 from './pages/image/ImagePost2';
import PersonUpdate from './pages/person/PersonUpdate';

import AddressList from './pages/AddressList';
import AddressDetail from './pages/address/AddressDetail';
import AddressPost from './pages/address/AddressPost';
import AddressUpdate from './pages/address/AddressUpdate';

function App() {
  return (
    <div className="App">
  

      <Routes>
          <Route path="/files" element={<ImageList/>} />
          <Route exact path="/files/:id" element={<ImageDetail/>}/>
          <Route exact path="/files/create" element={<ImagePost/>}/>
          <Route exact path="/files/create2" element={<ImagePost2/>}/>

          <Route path="/people" element={<PeopleList/>} />
          <Route exact path="/people/:id" element={<PersonDetail/>}/>
          <Route exact path="/people/create" element={<PersonPost/>}/>
          <Route exact path="/people/:id/update" element={<PersonUpdate/>}/>
          

          <Route path="/addresses" element={<AddressList/>} />
          <Route exact path="/addresses/:id" element={<AddressDetail/>}/>
          <Route exact path="/addresses/create" element={<AddressPost/>}/>
          <Route exact path="/addresses/:id/update" element={<AddressUpdate/>}/>
      </Routes>

    </div>
  );
}

export default App;
