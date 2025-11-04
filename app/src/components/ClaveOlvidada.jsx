import { useState } from "react";
import axios from "axios";

export default function ClaveOlvidada() {
  const [correo, setCorreo] = useState("");
  const [msg, setMsg] = useState("");

  const enviar = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      await axios.post("http://localhost:3000/auth/forgot-password", { correo });
      setMsg("Si el correo existe, te enviamos un mail con el link para resetear la contraseña.");
    } catch (err) {
      setMsg("Hubo un error, intentá de nuevo.");
    }
  };

  return (
    <form onSubmit={enviar} style={{ maxWidth:"350px", margin:"80px auto" }}>
      <h2>Recuperar contraseña</h2>
      
      <input
        type="email"
        placeholder="tu correo"
        value={correo}
        onChange={e => setCorreo(e.target.value)}
        style={{ width:"100%", padding:"10px", marginTop:"10px" }}
      />

      <button style={{marginTop:"20px"}}>Enviar link</button>

      {msg && <p style={{marginTop:"15px"}}>{msg}</p>}
    </form>
  );
}
