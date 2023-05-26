import './ShowKeep.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { MdDelete, MdModeEditOutline } from 'react-icons/md';
import { useForm } from 'react-hook-form'
import { Modal, Button } from 'react-bootstrap';
function ShowKeep() {
  let { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
  let [keep, setKeep] = useState([]);
  let [err, setErr] = useState("")
  console.log(err);
  let getKeep = () => {
    axios.get("http://localhost:4000/keeps")
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
  },[]);
  let [show, setShow] = useState(false);
  let showModal = () => setShow(true);
  let closeModal = () => setShow(false);
  let [keepToEdit, setKeepToEdit] = useState("");
  let editKeep = (keepObjectToEdit) => {
    showModal();
    setKeepToEdit(keepObjectToEdit);
    setValue("title", keepObjectToEdit.title);
    setValue("info", keepObjectToEdit.info);
  }
  let deleteKeep = (keepObjectToDelete) => {
    axios.delete(`http://localhost:4000/keeps/${keepObjectToDelete.id}`)
    delete keepObjectToDelete.id;
    axios.post("http://localhost:4000/removedKeeps", keepObjectToDelete)
      .then(response => {
        if (response.status === 201) {
          setErr("");
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
  }
  let saveKeep = () => {
    closeModal();
    let modifiedKeep = getValues();
    axios.put(`http://localhost:4000/keeps/${keepToEdit.id}`, modifiedKeep)
      .then(response => {
        if (response.status === 200) {
          setErr("");
          getKeep();
        }
      })
      .catch(err => {
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
  return (
    <div>
      <h1 className='display-6 text-center keep-heading'>Keeps</h1>
      <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 scroll">
        {
          keep.map((keepObj) => <div className='col mx-auto' key={keepObj.id}>
            <div className="card bg-secondary scrollable mb-3">
              <h4 className='bg-warning m-2 rounded p-2'>{keepObj.title}</h4>
              <div className="card-body">
                <p className=" lead rounded p-1 m-0">{keepObj.info}</p>
                <div className="forEditAndDelete">
                  <button className="edit-button me-1" onClick={() => editKeep(keepObj)}><MdModeEditOutline className='edit-icon' /></button>
                  <button className="delete-button" onClick={()=>deleteKeep(keepObj)}><MdDelete className='delete-icon'/></button>
                </div>
              </div>
            </div>
          </div>)
        }
      </div>
      <Modal show={show} onHide={closeModal} backdrop="static" centered className='modal'>
        <Modal.Header>
          <Modal.Title>Edit Keep</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div>
              <label htmlFor="title" className='mt-2'>Add Title</label>
              <input type="text" id="title" className="form-control" {...register("title", { required: true })} />
              {errors.title?.type==="required"&&<p className='text-danger'>* Title is required</p>}
            </div>
            <div>
              <label htmlFor="info" className='mt-2'>Add Text Here</label>
              <textarea id="info" cols="30" rows="10" className='form-control' {...register("info", { required: true })}></textarea>
              {errors.info?.type==="required"&&<p className='text-danger'>* Input is required</p>}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={saveKeep}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div> 
  )
}

export default ShowKeep