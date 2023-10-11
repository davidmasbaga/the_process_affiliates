// pages/page.js
'use client'
import { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    console.log('Email:', newEmail); // Agregar este console.log
    setEmail(newEmail);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    console.log('Password:', newPassword); // Agregar este console.log
    setPassword(newPassword);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
 

if (response.ok) {
  const data = await response.json();
  console.log('Response data:', data.token); // Agregar este console.log
  localStorage.setItem('token', data.token);
  alert('Logged in successfully!');
  // Puedes redirigir al usuario a la página principal o donde quieras
} else {
  const data = await response.json();
  alert(data.message);
}

   
  };



  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email: </label>
        <input 
          type="email" 
          value={email}
          onChange={handleEmailChange} // Usar el manejador de eventos modificado
        />
      </div>
      <div>
        <label>Password: </label>
        <input 
          type="password" 
          value={password}
          onChange={handlePasswordChange} // Usar el manejador de eventos modificado
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
  );
}

export default LoginPage;
