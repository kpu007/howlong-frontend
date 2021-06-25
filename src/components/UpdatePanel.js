import React, {useState, useEffect} from 'react'
import dateService from '../services/dateService'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdatePanel = () => {
    const [password, setPassword] = useState('')

    const handleUpdate = async (event) => {
        event.preventDefault()

        try {
          const success = await dateService.attemptUpdate({
            password
          })
          console.log(success.data)
    
        } catch (exception) {
            console.log(exception)
            console.log("Update failed!")
          //setShow(true)
        }
      }

      
    const updateForm = () => {
        return (
          <form onSubmit={handleUpdate}>
            <input id="password" type="password" value={password} placeholder="Password" name="Password" onChange={({ target }) => setPassword(target.value)} />
              &nbsp;
            <button type="submit">Update</button>
          </form>
        )
    }

    return (
        <div>
            {updateForm()}
        </div>
    )
}

export default UpdatePanel