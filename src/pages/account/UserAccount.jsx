import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

import api from '../../api'

import styled from 'styled-components'



const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`
const Title = styled.h1.attrs({
    className: 'h1',
})``


function Account() {
     const [user, setUser] = useState({});
       

    const fetchData = useCallback(async () => {
        await api.getAccount().then(response => {
            setUser(response.data.user)
           })
       }, []);

       useEffect(() => {
                fetchData();
       },[fetchData]);

     return (
            <Wrapper>
                <Title>{user.name}</Title>
                <Title>{user.lastName}</Title>
                <Title>{user.email}</Title>

                <Link to="/account/update-account" className="nav-link">
                Change personal data
                </Link>
                <Link to="/account/change-password" className="nav-link">
                Change password
                </Link>
            </Wrapper>
     );
}
export default Account