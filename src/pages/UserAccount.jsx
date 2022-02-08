import React, { useEffect, useState } from 'react'

import api from '../api'

import styled from 'styled-components'


const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`
const Title = styled.h1.attrs({
    className: 'h1',
})``


function UsersList() {
     const [user, setUser] = useState({});
       
     useEffect(() => {
        async function fetchData() {
            await api.getAccount().then(response => {
                setUser(response.data.user)
               })
          };
          fetchData();
    }, []);
     return (
            <Wrapper>
                <Title>{user.name}</Title>
                <Title>{user.lastName}</Title>
                <Title>{user.email}</Title>                        
            </Wrapper>
     );
}
export default UsersList