import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom'; 
import Landing from '../components/pages/Landing';
import Header from '../components/Header';
import Shop from '../components/shop/Shop';
import About from '../components/pages/About';
import ChatBot from '../components/chatBot/chatBot';
import 'materialize-css/dist/css/materialize.min.css';

const App = () =>  (
        <div>
            <BrowserRouter>
                 <div className = "container">
                     <Header/>
                     <ChatBot/>
                     <Route exact path = "/" component = {Landing}/>
                     <Route exact path = "/shop" component = {Shop}/>
                     <Route exact path = "/about" component = {About}/>
                     </div>      
            </BrowserRouter>
    </div>
     )

export default App;
