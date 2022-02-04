import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

class UpdateUser extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/users/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Chenge</Update>
    }
}


class UsersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getUsers().then(users => {
            this.setState({
                users: users.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { users, isLoading } = this.state
        console.log('TCL: UserList -> render -> users', users)

        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
                filterable: false,
            },
            {
                Header: 'LastName',
                accessor: 'lastName',
                filterable: false,
            },
            {
                Header: 'Email',
                accessor: 'email',
                filterable: false,
            },
            
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateUser id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!users.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={users}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={false}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default UsersList