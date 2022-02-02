import React, { useState, useCallback } from 'react';
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 800px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 188px;
`

function UserRegistration() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleIncAddedUser = useCallback(async () => {
        const payload = { name, lastName, email, password }

        await api.addedUser(payload).then(res => {
            window.alert(`User login successfully`);

            window.location.href = '/';
        }).catch((_) => {
            window.alert(`Something went wrong`);
        })
    }, [name, lastName, email, password]);

        
    const handleChangeInputName = useCallback(async (event) => {
        const name = await event.target.value
        setName(name);
    }, []);

    const handleChangeInputlastName = useCallback(async (event) => {
        const lastName = await event.target.value
        setLastName(lastName);
    }, []);

    const handleChangeInputEmail = useCallback(async (event) => {
        const email = await event.target.value
        setEmail(email);
    }, []);

    const handleChangeInputPassword = useCallback(async (event) => {
        const password = await event.target.value
        setPassword(password);
    }, []);
        return (
            <Wrapper>
                <Title>Registration</Title>

                <Label>First Name </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={handleChangeInputName}
                />

                <Label>Last Name </Label>
                <InputText
                    type="text"
                    value={lastName}
                    onChange={handleChangeInputlastName}
                />

                <Label>Email: </Label>
                <InputText
                    type="text"
                    value={email}
                    onChange={handleChangeInputEmail}
                />

                <Label>Password: </Label>
                <InputText
                    type="text"
                    value={password}
                    onChange={handleChangeInputPassword}
                />

                <Button onClick={handleIncAddedUser}>SignUp</Button>
            </Wrapper>
        );
    }

export default UserRegistration