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

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

function ConfirmRegistration() {
    const { search } = useLocation();

    const [token] = useState(qs.parse(search, { ignoreQueryPrefix: true }).emailConfirmToken);

    const handleConfirmRegistration = useCallback(async () => {
        const payload = { emailConfirmToken: token }

        await api.confirmRegistration(payload).then(res => {
            window.alert(`Ragistration finished`);

            window.location.href = '/';
        }).catch((_) => {
            window.alert(`Something went wrong`);
        })
    }, [token]);

    return (
        <Wrapper>
            <Title>Confirm Registration</Title>

            <Button onClick={handleConfirmRegistration}>Confirm</Button>
        </Wrapper>
    );
}

export default ConfirmRegistration
