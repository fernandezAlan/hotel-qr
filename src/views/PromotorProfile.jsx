// src/AddClientModal.js
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { db } from '../firebase';
import { useContext } from 'react';
import { userContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs,addDoc } from 'firebase/firestore';

Modal.setAppElement('#root'); // Necesario para accesibilidad

const AddClientModal = () => {
    const [isOpen, setIsOpen] = React.useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [clients, setClients] = useState([]);
  const {user,setUser} = useContext(userContext)
  const navigate = useNavigate()
  const clientsQuery = async()=>{
    const q = query(collection(db,'clients'),where('promotorId',"==",user.userID))
    const querySnapshot = await getDocs(q);
    const clientsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    setClients(clientsData)
  }
  useEffect(()=>{
    if(!user) navigate('/login')
    else{
        clientsQuery()
    }
  },[])
  useEffect(()=>{
    console.log('clientsData',clients)
  },[clients])
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const handleAddClient = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'clients'), {
        name,
        email,
        phone,
        promotorId:user.userID,
        promotorName:user.name
      });
      setName('');
      setEmail('');
      setPhone('');
      closeModal();
    } catch (error) {
      setError(error.message);
      console.error('Error al agregar cliente:', error);
    }
  };

  return (
    <>
    {clients.length && clients.map(client=><p>{`email: ${client.email} | Nombre: ${client.name} | Telefono:${client.phone}`}</p>)}
    <button onClick={openModal}>añadir cliente</button>
     <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Agregar Cliente">
      <h2>Agregar Cliente</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleAddClient}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Teléfono:</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <button type="submit">Agregar</button>
        <button type="button" onClick={closeModal}>Cancelar</button>
      </form>
    </Modal>
    </>
   
  );
};

export default AddClientModal;
