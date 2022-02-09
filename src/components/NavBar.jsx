import React, { Component } from 'react'
import styled from 'styled-components'

import Logo from './Logo'
import Links from './Links'

const Nav = styled.nav.attrs({
    className: 'navbar navbar-expand-lg navbar-dark bg-dark',
})`
    margin: 0px 40px 20px 40px;
`

class NavBar extends Component {
    render() {
        return (
            <Nav>
                <Logo />
                <Links />
            </Nav>
        )
    }
}

export default NavBar
