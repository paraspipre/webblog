import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { isAuth, getCookie } from "../../actions/auth";
import { create, getCategories, removeCategory } from "../../actions/category";

const Category = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        categories: [],
        removed: false,
        reload: false
    })

    const { name, error, success, categories, removed, reload } = values
    const token = getCookie('token')

    useEffect(() => {
        loadCategories()
    }, [reload])

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setValues({ ...values, categories: data })
            }
        })
    }

    const showCategories = () => {
        return categories.map((c, i) => {
            return <button key={i} onDoubleClick={() => deleteConfirm(c.slug)} title="Double click to delete" className='tag cat-all ms-1 me-1 mt-3'>
                {c.name}
            </button>
        })
    }

    const deleteConfirm = slug => {
        let answer = window.confirm("Are you sure you want to delete this category?")
        if (answer) {
            deleteCategory(slug)
        }
    }

    const deleteCategory = slug => {
        removeCategory(slug, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setValues({ ...values, error: false, success: false, name: '', removed: !removed, reload: !reload })
            }
        })
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        //console.log('create category',name)
        create({ name }, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false })
            } else {
                setValues({ ...values, name: '', error: false, success: true, removed: !removed, reload: !reload })
            }
        })
    }

    const handleChange = e => {
        setValues({ ...values, name: e.target.value, error: false, success: false, removed: '' })
    }

    const showSuccess = () => {
        if (success) {
            return <p className="show-result">Category is created</p>
        }
    }

    const showError = () => {
        if (error) {
            return <p className="show-result">Category already exist</p>
        }
    }

    const showRemoved = () => {
        if (removed && !success) {
            return <p className="show-result">Category is removed</p>
        }
    }

    const mouseMoveHandler = e => {
        setValues({ ...values, error: false, success: false, removed: false, reload: false })
    }

    const newCategoryForm = () => {
        return (
            <form onSubmit={clickSubmit}>
                <div className="form-group">
                    <label className="sub-head mb-2">Name</label>
                    <input type='text' className="form-control" onChange={handleChange} value={name} required />
                </div>
                <div>
                    <button type='submit' className="btn my-4">Create</button>
                </div>
            </form>
        )
    }

    return (<div className="w-[50%]">
        {showSuccess()}
        {showError()}
        {showRemoved()}
        <div onMouseMove={mouseMoveHandler}>
            {newCategoryForm()}
            <div className="d-flex flex-wrap">
                {showCategories()}
            </div>
        </div>
    </div>)
}

export default Category