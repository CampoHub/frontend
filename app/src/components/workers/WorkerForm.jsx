import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { useWorkers } from '../../context/WorkersContext';

const WorkerForm = ({ worker, onHide }) => {
  const { addWorker, editWorker } = useWorkers();

  const formik = useFormik({
    initialValues: {
      nombre: worker?.User?.nombre || '',
      email: worker?.User?.email || '',
      especialidad: worker?.especialidad || '',
      activo: worker?.activo ?? true
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nombre es requerido'),
      email: Yup.string().email('Email inválido').required('El email es requerido'),
      especialidad: Yup.string().required('La especialidad es requerida')
    }),
    onSubmit: async (values) => {
      const success = worker
        ? await editWorker(worker.id, values)
        : await addWorker(values);

      if (success) {
        onHide();
      }
    }
  });

  useEffect(() => {
    if (worker) {
      formik.setValues({
        nombre: worker.User?.nombre || '',
        email: worker.User?.email || '',
        especialidad: worker.especialidad || '',
        activo: worker.activo ?? true
      });
    }
  }, [worker]);

  return (
    <form onSubmit={formik.handleSubmit} className="p-fluid">
      <div className="field">
        <label htmlFor="nombre">Nombre</label>
        <InputText
          id="nombre"
          name="nombre"
          value={formik.values.nombre}
          onChange={formik.handleChange}
          className={formik.errors.nombre ? 'p-invalid' : ''}
        />
        {formik.errors.nombre && (
          <small className="p-error">{formik.errors.nombre}</small>
        )}
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <InputText
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className={formik.errors.email ? 'p-invalid' : ''}
        />
        {formik.errors.email && (
          <small className="p-error">{formik.errors.email}</small>
        )}
      </div>

      <div className="field">
        <label htmlFor="especialidad">Especialidad</label>
        <InputText
          id="especialidad"
          name="especialidad"
          value={formik.values.especialidad}
          onChange={formik.handleChange}
          className={formik.errors.especialidad ? 'p-invalid' : ''}
        />
        {formik.errors.especialidad && (
          <small className="p-error">{formik.errors.especialidad}</small>
        )}
      </div>

      <div className="field">
        <label htmlFor="activo">Estado</label>
        <Dropdown
          id="activo"
          name="activo"
          value={formik.values.activo}
          options={[
            { label: 'Activo', value: true },
            { label: 'Inactivo', value: false }
          ]}
          onChange={formik.handleChange}
        />
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={onHide}
          className="p-button-text"
        />
        <Button
          label="Guardar"
          icon="pi pi-check"
          type="submit"
          autoFocus
        />
      </div>
    </form>
  );
};

export default WorkerForm;