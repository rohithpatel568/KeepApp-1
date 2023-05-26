import axios from 'axios';
import './AddKeep.css'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';


function AddKeep() {
  let { register, handleSubmit, formState: { errors } } = useForm()
  let navigate = useNavigate();
  let [err, setErr] = useState("");
  let addNewKeep = (keepObj) => {
    axios.post('http://localhost:4000/keeps', keepObj)
      .then(response => {
        if (response.status === 201){
          setErr("");
          navigate("/");
        }
      })
      .catch(err => {
        if (err.response)
          setErr(err.message);
        else if (err.request)
          setErr(err.message);
        else
          setErr(err.message)
      });
  }


  return (
    <div>
      <h1 className="display-6 text-center keep-heading fw-bold">Add Keep</h1>
      {(errors.length !== 0) && <h2 className='display-6 text-danger text-center'>{err}</h2>}
      <div className="row">
        <div className="cols-11 col-sm-8 col-md-6 mx-auto">
          <form onSubmit={handleSubmit(addNewKeep)}>
            <div>
              <label htmlFor="title" className='mt-2'>Add Title</label>
              <input type="text" id="title" className="form-control" {...register("title", { required: true })} />
              {(errors.title?.type === "required") && <p className='text-danger'>* Title is required</p>}
            </div>
            <div>
              <label htmlFor="info" className='mt-2'>Add Text Here</label>
              <textarea id="info" cols="30" rows="10" className='form-control' {...register("info", { required: true })}></textarea>
              {errors.info?.type==="required"&&<p className='text-danger'>* Input is required</p>}
            </div>
            <button type='submit' className="btn btn-warning mt-2">Add Keep</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddKeep