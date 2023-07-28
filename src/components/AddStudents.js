import {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { v4 as uuidv4 } from 'uuid';
import api from '../api/students';

const formInputs = {name:"",username:"",email:"",phone:"",website:""}

export default function AddStudent({stdId, isOpen, handleCloseButton, showSuccess, showFailure}) {
  const [formData, setFormData] = useState(formInputs)
  const handleFormChange = (event) => {
          const {name, value} = event.target
          console.log("Target val", value)
          setFormData({...formData,[name] : value})
  }
  
const getOneRec = async(stdId) => {
        // console.log("Std ID ",stdId)
        try {
          //
          if(stdId){
            const response = await api.get("students/"+stdId)
            if(response){
              // console.log("Reposonse ", response.data)
              setFormData(response.data)
            }
          }else{
            const response = null
            return response
          }
         
        } catch (error) {
          console.log(error.message)
        }
  }

  useEffect(() => {
    getOneRec(stdId)
  }, [stdId])
  
  const handleEdit = (event) => {
    event.preventDefault();
    // Process the form data here (e.g., submit it to an API or perform actions)
    console.log('Form data:', formData);
    editData(formData,stdId)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process the form data here (e.g., submit it to an API or perform actions)
    console.log('Form data:', formData);
    addDataToDB(formData)
  };


  const addDataToDB = async (data) => {
    try {
      const requestBody = {
        id:uuidv4(),
        ...data
      }

      const response = await api.post("/students", requestBody)
      if (response){
        showSuccess(true)
        handleCloseButton() 
      }
    } catch (error) {
      //alert("There is error")
      showFailure(true)
      handleCloseButton() 
    }
  }

  const editData = async (data,stdId) => {
    try {
      console.log("Id to operate on ",stdId)
      const {email,name,phone, username, website} = data
      const requestBody = {email,name,phone, username, website}
      const response = await api.put("/students/"+stdId, requestBody)
      if (response){
        showSuccess(true)
        setFormData(formInputs)
        handleCloseButton() 
      }
    } catch (error) {
      //alert("There is error")
      showFailure(true)
      handleCloseButton() 
    }
  }
  return (
    <div>
      
      <Dialog open={isOpen} onClose={handleCloseButton}>
        <DialogTitle><h4>{stdId? "Edit Student Record" :"Add New Student"}</h4></DialogTitle>
        <DialogContent style={{width:"500px",margin:"auto"}}>
          <DialogContentText>
          </DialogContentText>
          <div style={{display:"flex", flexDirection:"column"}}>
              <TextField
                autoFocus
                id="name"
                label="Name"
                name='name'
                type="text"
                value={formData.name}
                onChange={handleFormChange}
                fullWidth
              />
              <br/>
              <TextField
                id="username"
                label="Username"
                name='username'
                type="text"
                value={formData.username}
                onChange={handleFormChange}
                fullWidth
              />
              <br/>
              <TextField
                id="email"
                label="Email"
                name='email'
                type="email"
                fullWidth
                value={formData.email}
                onChange={handleFormChange}
              />
              <br/>
              <TextField
                id="phone"
                name='phone'
                label="Phone"
                type="text"
                fullWidth
                value={formData.phone}
                onChange={handleFormChange}
              />
              <br/>
              <TextField
                className="mb-24"
                variant="outlined"
                id="website"
                label="Website"
                name='website'
                type="text"
                fullWidth
                value={formData.website}
                onChange={handleFormChange}
              />
              <br/>
          </div>
   
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseButton}>Cancel</Button>
          {stdId? 
            <Button onClick={handleEdit}>SEND</Button> 
            : 
            <Button onClick={handleSubmit}>SAVE</Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}