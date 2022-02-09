import React, { useCallback } from 'react';
import { useForm } from "react-hook-form";
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import api from '../../api'
import { emailValidator, passwordValidator } from '../../services/validation-rules'

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

function UserLogin() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleUserLogin = useCallback(async (data) => {
            try {
                const response = await api.loginUser(data);
                sessionStorage.setItem('accessToken', response.data.accessToken)
                sessionStorage.setItem('refreshToken', response.data.refreshToken)

                window.location.href = '/';
            } catch(err) {
                window.alert(err['validationErrors'] ? err['validationErrors'][0]['msg'] : err['errors']);
            }

    }, []);

    return (
        <Wrapper>
            <Title>Login</Title>
            <form onSubmit={handleSubmit(handleUserLogin)}>
                <Label>Email: </Label>
                <InputText
                    type="text"
                    autoComplete="off"
                    {...register("email", emailValidator)}
                />
                {errors.email && <p>Please check the Email</p>}

                <Label>Password: </Label>
                <InputText
                    type="password"
                    {...register("password", passwordValidator)}
                />
                {errors.password && <p>Please check the Password</p>}

                <Button type="submit">SignIn</Button>

                <Link to="/auth/reset-password" className="nav-link">
                    Forgot password?
                </Link>
            </form>
        </Wrapper>
    );
}

export default UserLogin