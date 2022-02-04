import React, { useState, useCallback, useEffect } from 'react'
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

function Links() {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        authenticationService.observableToken.subscribe(result => setIsLogged(Boolean(result)));
    });

    const onLogoutPressed = useCallback(() => {
        authenticationService.logout()
    }, []);

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
                        <Link to="/" onClick={onLogoutPressed} className="nav-link">
                            Logout
                        </Link>
                    }
                </Item>
                {!isLogged &&
                    <Item>
                        <Link to="/auth/registration" className="nav-link">
                            Registration
                        </Link>
                    </Item>
                }
            </List>
        </React.Fragment>
    )
}

export default Links
