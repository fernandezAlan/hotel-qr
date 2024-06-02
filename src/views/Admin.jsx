import React, { useEffect, useState } from "react";
import { getDocs, collection} from "firebase/firestore";
import { db } from "../firebase";
function Admin(){
    const [users,setUsers] = useState([])
    const [clients,setClients] = useState([])
    const queryProm = async ()=>{
        const querySnapshot = await getDocs(collection(db, 'users'));
        const users = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(users)
    }

    const queryClients = async()=>{
        const querySnapshot = await getDocs(collection(db, 'clients'));
        const clients = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClients(clients)
    }
  useEffect(()=>{
    queryProm()
    queryClients()
  },[])
  console.log('users',users)
  if(users.length)return<>
  <h2>promotores</h2>
  {users.map(user=><div>{`Email:${user.email}`} <button>hacer Admin</button> <button>eliminar</button></div>)}
  <h2>clientes</h2>
  {clients.map(client=><div>{`Email:${client.email} | nombre:${client.name} | Telefono:${client.phone} | promotor:${client.promotorName} `} </div>)}
  </>
  else return <div>no hay promotores registrados</div>
}

export default Admin