import React, { useState } from 'react'
import Form from 'react-bootstrap/form'
import Button from 'react-bootstrap/button'


const Login = props => {
    const [name, setName] = useState("")
    const [id, setId] = useState()

    const onChangeName = e => {
        const name = e.target.value
        setName(name)
    }

    const onChangeId = e => {
        const id = e.target.value
        setId(id)
    }

    const login = () => {
        props.login({ name: name, id: id })
        props.history.push('/')
    }
    return (
        <div>
            <Form>
                <Form.Group className='mb-2'>
                    <Form.Label>
                        Username
                    </Form.Label>
                    <Form.Control
                        type="Text"
                        placeholder='Insert username'
                        value={name}
                        onChange={onChangeName}
                    />
                </Form.Group>
                <Form.Group className='mb-2'>
                    <Form.Label>
                        ID
                    </Form.Label>
                    <Form.Control
                        type="Text"
                        placeholder='Insert id'
                        value={id}
                        onChange={onChangeId}
                    />
                </Form.Group>
                <Button variant='primary' onClick={login}>
                    Login
                </Button>
            </Form>
        </div>
    )

}
export default Login;