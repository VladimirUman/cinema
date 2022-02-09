import React, { useState, useCallback } from 'react';

import api from '../../api'
import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
    width: 30%;
`

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 30px 80px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

function ResetPassword() {
    const [email, setEmail] = useState('');

    const handleResetPassword = useCallback(async () => {
        const payload = { email }

        await api.resetPassword(payload).then(res => {
            window.alert(`Sent confirmation email`);

            window.location.href = '/';
        }).catch((_) => {
            window.alert(`Something went wrong`);
        })
    }, [email]);

    function handleChangeInputEmail(event) {
        const email = event.target.value;
        setEmail(email);
    }

    return (
        <Wrapper>
            <Title>Reset Password</Title>

            <Label>Email: </Label>
            <InputText
                type="text"
                value={email}
                onChange={handleChangeInputEmail}
            />

            <Button onClick={handleResetPassword}>Send email</Button>
        </Wrapper>
    );
}

export default ResetPassword
