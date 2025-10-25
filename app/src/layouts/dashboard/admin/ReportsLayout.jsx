import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";

export default function ReportsLayout() {
  const exportPDF = () => {
    // Aquí se conectará con el servicio de exportación (jspdf o backend)
    console.log("Generar PDF de reporte");
  };

  return (
    <Card title="Reportes del Sistema" className="shadow-2 border-round-lg">
      <p>Filtra y genera reportes de parcelas, actividades y recursos.</p>
      <div className="grid formgrid p-fluid gap-3">
        <div className="col-12 md:col-3">
          <label>Tipo de reporte</label>
          <Dropdown
            options={[
              { label: "Parcelas", value: "plots" },
              { label: "Actividades", value: "activities" },
              { label: "Recursos", value: "resources" },
              { label: "Trabajadores", value: "workers" },
            ]}
            placeholder="Seleccionar"
          />
        </div>
        <div className="col-12 md:col-3">
          <label>Desde</label>
          <Calendar showIcon />
        </div>
        <div className="col-12 md:col-3">
          <label>Hasta</label>
          <Calendar showIcon />
        </div>
        <div className="col-12 md:col-3 flex align-items-end">
          <Button
            label="Exportar PDF"
            icon="pi pi-file-pdf"
            className="p-button-danger"
            onClick={exportPDF}
          />
        </div>
      </div>
    </Card>
  );
}
