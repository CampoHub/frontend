import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      await axios.post("http://localhost:3000/auth/reset-password", {
        token,
        nuevaContraseña: password
      });

      setMsg("¡Contraseña cambiada con éxito! Redirigiendo al inicio de sesión...");
      setSuccess(true);

      setTimeout(() => {
        navigate('/inicio-sesion');
      }, 2000);

    } catch (error) {
      setMsg("Error: " + (error.response?.data?.message || "token inválido o vencido."));
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  if (!token) return <div>token faltante</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Resetear contraseña</h2>

      <input
        type="password"
        placeholder="Nueva contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button disabled={loading}>
        {loading ? 'Cambiando contraseña...' : 'Cambiar contraseña'}
      </button>

      {msg && (
        <div style={{ 
          marginTop: '1rem',
          padding: '1rem',
          borderRadius: '4px',
          backgroundColor: success ? '#d4edda' : '#f8d7da',
          color: success ? '#155724' : '#721c24'
        }}>
          {msg}
        </div>
      )}
    </form>
  );
}
