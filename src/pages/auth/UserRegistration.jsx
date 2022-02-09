import React, { useCallback } from 'react';
import api from '../../api'
import { useForm } from "react-hook-form";
import styled from 'styled-components'

import { emailValidator, passwordValidator, nameValidator } from '../../services/validation-rules'

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

function UserRegistration() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleIncAddedUser = useCallback(async (data) => {
        try {
            await api.addedUser(data);

            window.alert(`Sent confirmation email`);

            window.location.href = '/';
        } catch(err) {
            window.alert(err['validationErrors'] ? err['validationErrors'][0]['msg'] : err['errors']);
        }
    }, []);

    return (
        <Wrapper>
            <Title>Registration</Title>

            <form onSubmit={handleSubmit(handleIncAddedUser)}>
                <Label>First Name </Label>
                <InputText
                    type="text"
                    autoComplete="off"
                    {...register("name", nameValidator)}
                />
                {errors.name && <p>Please check the Name</p>}

                <Label>Last Name </Label>
                <InputText
                    type="text"
                    autoComplete="off"
                    {...register("lastName", nameValidator)}
                />
                {errors.lastName && <p>Please check the LastName</p>}

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
                    autoComplete="off"
                    {...register("password", passwordValidator)}
                />
                {errors.password && <p>Please check the Password</p>}

                <Button type="submit">SignUp</Button>
            </form>
        </Wrapper>
    );
}

export default UserRegistration