import React, {Component, useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Properties from './components/properties';
import Favorites from "./components/favorites";
import Login from "./components/login";


const root = ReactDOM.createRoot(document.getElementById('container'));

function SearchBar(props) {
    return (
        <form>
            <input type="text" value={props.filterText} placeholder="Search..." onChange={(e) => props.onFilterTextChange(e.target.value)} />
        </form>
    );
}



function FilterablePropertiesList(props) {
    const [filterText, setFilterText] = useState('');
    
    root.render(
        <div>
            <Properties
                properties={props.properties}
                filterText={filterText} />
        </div>
    );
    
    return(
        <div>
            <SearchBar 
                filterText={filterText} 
                onFilterTextChange={setFilterText} />
        </div>
    );
}

function FilterableFavoritesList(props) {
    const [filterText, setFilterText] = useState('');

    root.render(
        <div>
            <Favorites
                properties={props.properties}
                filterText={filterText} />
        </div>
    );

    return(
        <div>
            <SearchBar
                filterText={filterText}
                onFilterTextChange={setFilterText} />
        </div>
    );
}

function App() {

    const [properties, setProperties] = useState([]);
    
    useEffect( () => {
        fetch('/properties2')
            .then(res => res.json())
            .then((data) => {
                setProperties(data)
            })
            .catch(console.log)
    });

    const [users, setUsers] = useState([]);

    useEffect( () => {
        fetch('/users')
            .then(res => res.json())
            .then((data) => {
                setUsers(data)
            })
            .catch(console.log)
    });
    /*
    const [login, setLogin] = useState([]);
    useEffect( () => {
        fetch('/login')
            .then(res => res.json())
            .then((data) => {
                setLogin(data)
            })
            .catch(console.log)
    });
    */
    const [test, setTest] = useState([]);

    useEffect( () => {
        fetch('/test')
            .then(res => res.json())
            .then((data) => {
                setTest(data)
            })
            .catch(console.log)
    });

    return(
        //<FilterablePropertiesList properties={properties} />
            <Router>
                <Routes>
                    <Route exact path='/' element={<FilterablePropertiesList properties={properties} />} />
                    <Route path='/favorites' element={<FilterableFavoritesList  properties={properties} users={users} test={test} />} />
                </Routes>
            </Router>
    );
}

export default App;