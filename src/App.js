import React from 'react';
import Page from './views/page/index'
import {withRouter, Switch, Route} from 'react-router-dom'
import './App.css';

function App() {
    return ( 
        <div className = "App" >
            <Page / >
        </div>
    );
}

export default withRouter(App);