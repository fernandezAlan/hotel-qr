// src/Register.js
import React, { useState } from 'react';
import { auth,db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, setDoc, doc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate()
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e)=>{
    setName(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("userCredential",userCredential)
      const user = userCredential.user
      await setDoc(doc(db,'users',user.uid),{
        userID: user.uid,
        isAdmin:false,
        email:user.email,
        name:name
      })
      setSuccess('Registro exitoso. Por favor, inicia sesión.');
      navigate('/login')
    } catch (error) {
      setError('Error al registrar: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;