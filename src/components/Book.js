import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
const Book = () => {
    // url of api restful
    const URL = "http://localhost:8000/api/books/"

    // autofocus input ref
    const inputRefTitle = useRef()
    const inputRefAuthor = useRef()
    const inputRefPrice = useRef()


    // add state list data
    const [stateBook, setstateBook] = useState([])

    // add state form
    const [stateForm, setstateForm] = useState({
        id: '', title: '', author: '', price: ''
    })
    // add setstateForm a form
    const { id, title, author, price } = stateForm


    // function onInputChange of setstateForm
    const onInputChange = (e) => {
        setstateForm({ ...stateForm, [e.target.name]: e.target.value })
    }


    // function onSubmit 
    const onSubmit = (e) => {
        e.preventDefault()
        if (id === '') {
            axios.post(URL, stateForm)
                .then(res => {
                    // console.log(res['data']['message'])
                    alert(res['data']['message'])
                    listData()
                    cleanInputs()
                })
                .catch(err => {
                    console.error(err);
                })
        } else {
            axios.put(URL + id, stateForm)
                .then(res => {
                    // console.log(res['data']['message'])
                    alert(res['data']['message'])
                    listData()
                    cleanInputs()
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }

    // function get data for edit
    const getData = (id) => {
        axios.get(URL + id)
            .then(res => {
                // console.log(res['data']['data']['id'])
                setstateForm({
                    id: res['data']['data']['id'],
                    title: res['data']['data']['title'],
                    author: res['data']['data']['author'],
                    price: res['data']['data']['price']
                })
            })
            .catch(err => {
                console.error(err);
            })
        inputRefTitle.current.focus()
    }

    // function delete data
    const deleteData = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                axios.delete(URL + id)
                .then(res => {
                    listData()
                })
                .catch(err => {
                    console.error(err); 
                })
            }
        })
    }

    // function  clean inputs in on submit
    const cleanInputs = () => {
        setstateForm({
            id: '', title: '', author: '', price: ''
        })
        inputRefTitle.current.focus()
    }

    // function list data
    const listData = () => {
        axios.get(URL)
            .then(res => {
                // console.log(res.data)
                setstateBook(res.data.data)
            })
            .catch(err => {
                console.error(err);
            })
    }
    useEffect(() => {
        listData()
    }, [])
    return (
        <div>
            <div className="row">
                <div className="col-sm-3">
                    <div className="card" id='div'>
                        <div className="card-body" id="div1">
                            <h5 className="card-title">Form</h5>
                            <form onSubmit={e => onSubmit(e)}>
                                <input type="hidden"
                                    name='id'
                                    value={id}
                                    onChange={e => onInputChange(e)} />
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text"
                                        className="form-control"
                                        name="title"
                                        id="inputCss"
                                        value={title}
                                        autoFocus
                                        required
                                        ref={inputRefTitle}
                                        onChange={e => onInputChange(e)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="author" className="form-label">Auhtor</label>
                                    <input type="text"
                                        className="form-control"
                                        name="author"
                                        id="inputCss"
                                        value={author}
                                        required
                                        ref={inputRefAuthor}
                                        onChange={e => onInputChange(e)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="text"
                                        className="form-control input"
                                        name="price"
                                        id="inputCss"
                                        value={price}
                                        required
                                        ref={inputRefPrice}
                                        onChange={e => onInputChange(e)} />
                                </div>

                                <button type="submit" className="btn btn-primary" id="btnAdd">Add</button>
                                <button type="button" className="btn btn-success" onClick={() => cleanInputs()}>New</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-sm-8">
                    <div className="card" id="div">
                        <div className="card-body table table-responsive">
                            <h5 className="card-title text-white">List</h5>
                            <table className="table text-white">
                                <thead>
                                    <tr>
                                        <th itemScope="col">#</th>
                                        <th itemScope="col">Title</th>
                                        <th itemScope="col">Author</th>
                                        <th itemScope="col">Price</th>
                                        <th itemScope="col" colSpan="2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        stateBook.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.title}</td>
                                                <td>{item.author}</td>
                                                <td>{item.price}</td>
                                                <td>
                                                    <button className="btn btn-primary btn-sm"
                                                        id="btnEdit" title="Edit"
                                                        onClick={() => getData(item.id)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button className="btn btn-danger btn-sm"
                                                        title="Delete"
                                                        onClick={() => deleteData(item.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Book
