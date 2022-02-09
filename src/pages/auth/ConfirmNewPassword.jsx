import React, { useState, useCallback } from 'react';
import { useLocation } from "react-router-dom";
import qs from 'qs';

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

function ConfirmNewPassword() {
    const { search } = useLocation();

    const [token] = useState(qs.parse(search, { ignoreQueryPrefix: true }).resetPasswordToken);
    const [password, setPassword] = useState('');

    const handleConfirmPassword = useCallback(async () => {
        const payload = {
            resetPasswordToken: token,
            password
        }

        await api.confirmNewPassword(payload).then(res => {
            window.alert(`Password changed`);

            window.location.href = '/';
        }).catch((_) => {
            window.alert(`Something went wrong`);
        })
    }, [token, password]);

    function handleChangeInputPassword(event) {
        const password = event.target.value;
        setPassword(password);
    }

    return (
        <Wrapper>
            <Title>Confirm New Password</Title>

            <Label>New password: </Label>
            <InputText
                type="text"
                value={password}
                onChange={handleChangeInputPassword}
            />

            <Button onClick={handleConfirmPassword}>Confirm password</Button>
        </Wrapper>
    );
}

export default ConfirmNewPassword
