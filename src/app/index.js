import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { MoviesList, MoviesInsert, MoviesUpdate, UserRegistration, UserLogin } from '../pages'
 
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/movies/list" exact component={MoviesList} />
                <Route path="/movies/create" exact component={MoviesInsert} />
                <Route path="/movies/update/:id" exact component={MoviesUpdate} />
                <Route path="/auth/login" exact component={UserLogin} />
                <Route path="/auth/registration" exact component={UserRegistration} />
            </Switch>
        </Router>
    )
}

export default App
