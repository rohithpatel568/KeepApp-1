import './DeletedKeep.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MdDelete } from 'react-icons/md';
import { MdRestore } from 'react-icons/md';
function DeletedKeep() {
  let [keep, setKeep] = useState([]);
  let [err, setErr] = useState("");
  console.log(err);
  const getKeep = () => {
    axios.get("http://localhost:4000/removedKeeps")
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
          setKeep(response.data);
        }
      })
      .catch((err) => {
        if (err.response) // 404 error or invalid url error {4xx,5xx} client side failure
        {
          setErr(err.message)
          console.error(err)
        }
        else if (err.request) {
          setErr(err.message)       //network failure error
          console.error(err)
        }
        else {
          setErr(err.message)       // some other error
          console.error(err)
        }
      })
  }
  useEffect(() => {
    getKeep();
  }, [])
  let restoreKeep = (keepObjectToBeRestored) => {
    axios.delete(`http://localhost:4000/removedKeeps/${keepObjectToBeRestored.id}`)
    delete keepObjectToBeRestored.id
    axios.post("http://localhost:4000/keeps", keepObjectToBeRestored)
      .then(response => {
        if (response.status === 201) {
          setErr = "";
        }
      })
      .catch(err => {
        if (err.response)
          setErr(err.message)
        else if (err.request)
          setErr(err.message);
        else
          setErr(err.message);
      })
    getKeep();
  };
  let deleteKeep = (keepObjectToBeDeleted) => {
    axios.delete(`http://localhost:4000/removedKeeps/${keepObjectToBeDeleted.id}`)
    getKeep();
  };
  return (
    <div>
      <h1 className="display-6 text-center keep-heading ">Deleted Keeps</h1>
      <div className="row row-cols-sm-1 row-cols-md-2 row-cols lg-3">
        {
          keep.map(keepObj => <div className='col mx-auto'>
            <div className="card bg-secondary mb-3">
            <h4 className='bg-warning m-2 rounded p-2'>{keepObj.title}</h4>
              <div className="card-body">
                <p className=" lead rounded p-1 m-0">{keepObj.info}</p>
                <div className="forEditAndDelete">
                  <button className="edit-button me-1" onClick={() => restoreKeep(keepObj)}><MdRestore className='edit-icon' /></button>
                  <button className="delete-button" onClick={()=>deleteKeep(keepObj)}><MdDelete className='delete-icon'/></button>
                </div>
              </div>
            </div>
          </div>)
        }
      </div>
    </div>
  )
}

export default DeletedKeep