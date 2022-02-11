import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

import api from '../../api'

import styled from 'styled-components'

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 0px;
`

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
        <Button>
             <Link  to="/account/update-account" className="btn btn-primary">
               Change personal data
             </Link>
        </Button>
        <Button>
              <Link  to="/account/change-password" className="btn btn-primary">
               Change password
        </Link>
        </Button>
        <Button>
              <Link  to="" className="btn btn-primary">
               Change Email
        </Link>
        </Button>
     </Wrapper>
     );
}
export default Account