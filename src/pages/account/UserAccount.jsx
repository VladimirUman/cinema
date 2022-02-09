import React, { useEffect, useState, useCallback,Component } from 'react'

import api from '../../api'

import styled from 'styled-components'

const Update = styled.button.attrs({
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

class UpdateUser extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/users/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Change personal data</Update>
    }
}


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

                <span><UpdateUser id={user._id} /></span>
            </Wrapper>
     );
}
export default Account