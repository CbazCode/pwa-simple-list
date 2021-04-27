import React, {useState, useEffect} from 'react'
import {Alert, Table} from 'react-bootstrap'
function Users() {


    const [data, setData] = useState([])
    const [mode, setMode] = useState('online')
    useEffect(() => {
        let url = 'https://jsonplaceholder.typicode.com/users'
        fetch(url)
            .then(res=> res.json())
            .then(data => {
                setData(data)
                setMode('online')
                localStorage.setItem('users', JSON.stringify(data))
            } )
            .catch(err =>{
                console.log(err)
                setMode('offline')
                setData(JSON.parse(localStorage.getItem('users')))
            })
        return () => {
            setData([])
        }
    }, [])
    return (
        <div>
        <div>
            {
                mode==='offline'?
                <Alert variant='primary'>
                    You are in offline mode
                </Alert> : null
            }
        </div>
            <h1>Users</h1>
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            </tr>
        </thead>
        <tbody>
            {
                data.map(item=> (
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.address.street}</td>
                    </tr>
                ))
            }
        </tbody>
        </Table>
        </div>
    )
}

export default Users
