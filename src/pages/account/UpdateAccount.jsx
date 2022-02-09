import React, { useCallback, useState, useEffect } from 'react'
import api from '../../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 30px 80px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
    width: 30%;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

function UsersUpdate() {

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleUpdateUser = useCallback(async () => {
        const payload = {name, lastName}

        await api.updateAccount(payload).then(res => {
            window.alert(`Account updated`);
        }).catch((_) => {
            window.alert(`Something went wrong`);
        })
    }, [name, lastName]);
    
    const fetchData = useCallback(async () => {
        await api.getAccount().then(response => {
            setName(response.data.user.name)
            setLastName(response.data.user.lastName)
           })
       }, []);

       useEffect(() => {
                fetchData();
       },[fetchData]);

    const handleChangeInputName = useCallback(async(event) => {
        const name = event.target.value
        setName(name);
    }, []);
    const handleChangeInputLastName = useCallback(async(event) => {
        const lastName = event.target.value
        setLastName(lastName);
    }, []);
        return (
            <Wrapper>
                <Title>User Data</Title>

                <Label>Name: </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={handleChangeInputName}
                />

                <Label>Last Name: </Label>
                <InputText
                    type="text"
                    value={lastName}
                    onChange={handleChangeInputLastName}
                />

                <Button onClick={handleUpdateUser}>Save</Button>
                <CancelButton href={'/account'}>Back</CancelButton>
            </Wrapper>
        );
    }

export default UsersUpdate

