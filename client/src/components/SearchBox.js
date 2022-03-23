import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


const SearchBox = () => {
    let navigate = useNavigate()
    const [keyword, setKeyword] = useState("")

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate("/")
        }
    }
  return (
    <div>
        <Form onSubmit={submitHandler} className="d-flex" style={{ width: "90%", margin: "10px auto"}}>
            <Form.Control
                type='text'
                name="keyword"
                placeholder="Search products ..."
                onChange={(e) => setKeyword(e.target.value)}
                className="mr-sm-2 ml-sm-5 ml-auto"
            ></Form.Control>
            <Button variant="info" type="submit" className="p-2" style={{width: 60}}>
                <i className="fas fa-search"></i>
            </Button>
        </Form>
    </div>
  )
}

export default SearchBox