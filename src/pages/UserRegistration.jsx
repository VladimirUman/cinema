import React, { Component } from 'react'
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

class UserRegistration extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            lastName: '',
            email: '',
            password: '',
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputlastName = async event => {
        const lastName = event.target.value
        this.setState({ lastName })
    }

    handleChangeInputEmail = async event => {
        const email = event.target.value
        this.setState({ email })
    }

    handleChangeInputPassword = async event => {
        const password = event.target.value
        this.setState({ password })
    }

    handleIncAddedUser = async () => {
        const { name, lastName, email, password } = this.state
        const payload = { name, lastName, email, password}

        await api.insertUser(payload).then(res => {
            window.alert(` User added successfully`)
            this.setState({
                name: '',
                lastName: '',
                email: '',
                password: '',
            })
        })
    }

    render() {
        const { name, lastName, email, password } = this.state
        return (
            <Wrapper>
                <Title>Registration</Title>

                <Label>First Name </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={this.handleChangeInputName}
                />

                <Label>Last Name </Label>
                <InputText
                    type="text"
                    value={lastName}
                    onChange={this.handleChangeInputlastName}
                />

                <Label>Email: </Label>
                <InputText
                    type="text"
                    pattern="[0-9]+([,\.][0-9]+)?"
                    value={email}
                    onChange={this.handleChangeInputEmail}
                />

                <Label>Password: </Label>
                <InputText
                    type="text"
                    value={password}
                    onChange={this.handleChangeInputPassword}
                />

                <Button onClick={this.handleIncAddedUser}>SignUp</Button>
            </Wrapper>
        )
    }
}

export default UserRegistration