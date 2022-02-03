import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { authenticationService } from '../services/authentication'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogged: false
        };
    }

    componentDidMount() {
        authenticationService.isLogedIn.subscribe(result => this.setState({ isLogged: Boolean(result) }));
    }

    render() {
        const { isLogged } = this.state;

        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    MERN Cinema
                </Link>
                <Collapse>
                    {isLogged &&
                        <List>
                            <Item>
                                <Link to="/movies/list" className="nav-link">
                                    List Movies
                                </Link>
                            </Item>
                            <Item>
                                <Link to="/movies/create" className="nav-link">
                                    Create Movie
                                </Link>
                            </Item>
                        </List>
                    }
                </Collapse>
                <List>
                    <Item>
                        {!isLogged &&
                            <Link to="/auth/login" className="nav-link">
                                Login
                            </Link>
                        }
                        {isLogged &&
                            <Link to="/" onClick={() => authenticationService.logout()} className="nav-link">
                                Logout
                            </Link>
                        }
                    </Item>
                    <Item>
                        <Link to="/auth/registration" className="nav-link">
                            Registration
                        </Link>
                    </Item>
                </List>
            </React.Fragment>
        )
    }
}

export default Links
