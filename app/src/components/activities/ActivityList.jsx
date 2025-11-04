import { useContext, useState } from 'react';
import { ActivitiesContext } from '../../context/ActivitiesContext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '../../layouts/dashboard/dashboard.css';
import './activities.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    padding: 5,
  },
  tableCell: {
    textAlign: 'center',
  },
});

const ActivityReport = ({ activities }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Reporte de Actividades</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCol, styles.tableCell]}>Nombre</Text>
          <Text style={[styles.tableCol, styles.tableCell]}>Tipo</Text>
          <Text style={[styles.tableCol, styles.tableCell]}>Fecha Inicio</Text>
          <Text style={[styles.tableCol, styles.tableCell]}>Estado</Text>
        </View>
        {activities.map((activity, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={[styles.tableCol, styles.tableCell]}>{activity.nombre}</Text>
            <Text style={[styles.tableCol, styles.tableCell]}>{activity.tipo}</Text>
            <Text style={[styles.tableCol, styles.tableCell]}>{new Date(activity.fecha_inicio).toLocaleDateString()}</Text>
            <Text style={[styles.tableCol, styles.tableCell]}>{activity.estado}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const ActivityList = ({ activities, onEditActivity }) => {
  const { removeActivity } = useContext(ActivitiesContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    const activity = activities.find(a => a.id === id);
    const confirmMessage = `¿Estás seguro de que quieres eliminar la actividad "${activity.nombre}"?\n\nEsta acción no se puede deshacer.`;

    if (window.confirm(confirmMessage)) {
      setLoading(true);
      setError(null);

      try {
        await removeActivity(id);
      } catch (error) {
        setError(error.message || 'Error al eliminar la actividad');
        console.error('Error al eliminar la actividad:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Nombre", "Tipo", "Fecha Inicio", "Estado"];
    const tableRows = activities.map(activity => [
      activity.nombre,
      activity.tipo,
      new Date(activity.fecha_inicio).toLocaleDateString(),
      activity.estado
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.text("Lista de Actividades", 14, 15);
    doc.save("actividades.pdf");
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <button
          className="btn btn-edit"
          onClick={() => onEditActivity(rowData)}
          disabled={loading}
        >
          <i className="pi pi-pencil"></i>
          <span>Editar</span>
        </button>
        <button
          className="btn btn-delete"
          onClick={() => handleDelete(rowData.id)}
          disabled={loading}
        >
          <i className="pi pi-trash"></i>
          <span>Eliminar</span>
        </button>
      </div>
    );
  };

  return (
    <div className="activities-table-container">
      <div className="table-actions">
        <PDFDownloadLink
          document={<ActivityReport activities={activities} />}
          fileName="reporte_actividades.pdf"
          className="btn btn-export"
        >
          {({ loading }) => (
            <>
              <i className="pi pi-file-pdf"></i>
              {loading ? 'Generando PDF...' : 'Descargar PDF'}
            </>
          )}
        </PDFDownloadLink>
      </div>
      {activities.length === 0 ? (
        <p className="empty-message">No hay actividades registradas</p>
      ) : (
        <DataTable value={activities} showGridlines paginator rows={10} className="p-datatable-striped">
          <Column field="nombre" header="Nombre" sortable></Column>
          <Column field="tipo" header="Tipo" sortable></Column>
          <Column field="fecha_inicio" header="Fecha Inicio" body={(rowData) => new Date(rowData.fecha_inicio).toLocaleDateString()} sortable></Column>
          <Column field="estado" header="Estado" sortable></Column>
          <Column body={actionBodyTemplate} header="Acciones"></Column>
        </DataTable>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default ActivityList;