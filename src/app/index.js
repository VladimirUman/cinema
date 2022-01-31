import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { MoviesList, MoviesInsert, MoviesUpdate, ConfirmRegistration, ResetPassword, ConfirmNewPassword } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/movies/list" exact component={MoviesList} />
                <Route path="/movies/create" exact component={MoviesInsert} />
                <Route
                    path="/movies/update/:id"
                    exact
                    component={MoviesUpdate}
                />
            </Switch>
            <Route path="/reset-password" exact component={ResetPassword} />
            <Route path="/confirm-new-password" exact component={ConfirmNewPassword} />
            <Route path="/confirm-registration" exact component={ConfirmRegistration} />
        </Router>
    )
}

export default App
