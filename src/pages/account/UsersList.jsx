import React, {useCallback, useState, useEffect} from 'react'
import ReactTable from 'react-table'
import api from '../../api'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`
const Button = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

function UsersList() {
    const [users, setUsers] = useState({});
      

   const fetchData = useCallback(async () => {

       await api.getUsers().then(response => {
           setUsers(response.data.data)
          })
      }, []);

      useEffect(() => {
               fetchData();
      },[fetchData]);
      
        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'LastName',
                accessor: 'lastName',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                           <Link  to="/account/update-user" className="btn btn-primary">
                              Update
                           </Link>
                           <Button href={''}>Delet</Button>
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
                        defaultPageSize={10}
                        showPageSizeOptions={false}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }

export default UsersList