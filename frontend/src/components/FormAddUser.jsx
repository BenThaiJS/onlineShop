import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState({});
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("image", image);
    formData.append("role", role);

    try {
      await axios.post("http://localhost:5000/users", formData);
      navigate("/users");
    } catch (err) {
      if (err.response) {
        setMsg(err.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className='title'>Users</h1>
      <h2 className='subtitle'>Add New User</h2>
      <div className='card is-shadowless'>
        <div className='card-content'>
          <div className='content'>
            <form
              onSubmit={saveUser}
              encType='multipart/form-data'
              method='post'
            >
              <p className='has-text-centered'>{msg}</p>
              <div className='field'>
                <label className='label'>Name</label>
                <div className='control'>
                  <input
                    type='text'
                    className='input'
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Email</label>
                <div className='control'>
                  <input
                    type='email'
                    className='input'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Password</label>
                <div className='control'>
                  <input
                    type='password'
                    className='input'
                    placeholder='*******'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Confirm Password</label>
                <div className='control'>
                  <input
                    type='password'
                    className='input'
                    placeholder='*******'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Image</label>
                <div className='control'>
                  <input
                    type='file'
                    className='input'
                    name='image'
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Role</label>
                <div className='control'>
                  <div className='select is-fullwidth'>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option></option>
                      <option value='admin'>Admin</option>
                      <option value='user'>User</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className='field'>
                <div className='control'>
                  <button type='submit' className='button is-success'>
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddUser;
