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

function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUserLogin = useCallback(async () => {
        const payload = { email, password }
        

        await api.loginUser(payload).then(res => {
            window.alert(`User login successfully`);

            window.location.href = '/';
        }).catch((_) => {
            window.alert(`Something went wrong`);
        })
    }, [email, password]);


    async function handleChangeInputEmail(event){
        const email = event.target.value
        setEmail(email);
    }

    async function handleChangeInputPassword(event){
        const password = event.target.value
        setPassword(password)
    }

    return (
            <Wrapper>
                <Title>Login</Title>

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

                <Button onClick={handleUserLogin}>SignIn</Button>
            </Wrapper>
        );
    }

export default UserLogin