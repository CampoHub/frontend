import React, { useContext, useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { AuthContext } from "@/context/AuthContext";

export default function SettingsLayout() {
  const { user } = useContext(AuthContext);
  const [nombre, setNombre] = useState(user?.nombre || "");
  const [correo, setCorreo] = useState(user?.correo || "");

  const handleSave = () => {
    // Aquí podrías usar tu servicio de users.js
    console.log("Guardar cambios de perfil", { nombre, correo });
  };

  return (
    <Card
      title="Configuración del Administrador"
      className="shadow-2 border-round-lg"
    >
      <div className="p-fluid grid formgrid">
        <div className="field col-12 md:col-6">
          <label htmlFor="nombre">Nombre</label>
          <InputText
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="field col-12 md:col-6">
          <label htmlFor="correo">Correo</label>
          <InputText
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>
      </div>
      <Button label="Guardar cambios" icon="pi pi-save" onClick={handleSave} />
    </Card>
  );
}
