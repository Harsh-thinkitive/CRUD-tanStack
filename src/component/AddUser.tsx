import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function AddUser() {

    const [name, setName] = useState("");
    const [deparment, setDeparment] = useState("");
    const [contact, setContact] = useState("");

    const { id } = useParams();

    const handlePost = async (data : any) => {
        const response = await axios.post('https://crudcrud.com/api/f4225333d42348c684523c40650df1d2/users', data);
        return response.data;
    }

    const handleUpadate  = async (data : any) => {
        const response = await axios.put('https://crudcrud.com/api/f4225333d42348c684523c40650df1d2/users', data);
        return response.data;
    }

    useQuery({queryKey : ["user", id] , queryFn : async () => {
        const response = await axios.get(`https://crudcrud.com/api/f4225333d42348c684523c40650df1d2/users/${id}`);
        setName(response.data.name);
        setContact(response.data.contact);
        setDeparment(response.data.deparment);
        return response.data
    } , enabled: !!id});

    const { mutate : createMutation } = useMutation({mutationFn : handlePost , onSuccess : () => {
        alert("User Added Successfully");
    }, onError : () => {
        alert("Something Went Wrong")
    }});

    const { mutate : updateMutation } = useMutation({mutationFn : handleUpadate , onSuccess : () => {
        alert("User Updated Successfully");
    }, onError : () => {
        alert("Something Went Wrong")
    }});

    const handleSubmit = async (e : any) => {
        e.preventDefault();
        if(name != "" &&  deparment != "" && contact != ""){
            if(id){
                return await updateMutation({name , deparment , contact});
            }
            return await createMutation({name, deparment, contact});
        }else{
            alert("Please Fill All  Fields");
        }
    }

  return (
    <>
    {id ? <h1 style={{textAlign : "center" , margin : "5%"}}>Update User</h1> : <h1 style={{textAlign : "center" , margin : "5%"}}>Add User</h1>}
    <form style={{margin : "10%"}}>
      <div className="form-group">
        <label htmlFor="nameInput">Name</label>
        <input
          type="text"
          className="form-control"
          id="nameInput"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="departmentInput">Department</label>
        <input
          type="text"
          className="form-control"
          id="departmentInput"
          placeholder="Enter Department"
          value={deparment}
          onChange={(e) => setDeparment(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="contactInput">Contact</label>
        <input
          type="text"
          className="form-control"
          id="contactInput"
          placeholder="Enter Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
    </>
  );
}
