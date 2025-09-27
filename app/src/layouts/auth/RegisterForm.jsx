import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { InputText } from "primereact/inputtext"
import { Password } from 'primereact/password'
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { Link, useNavigate } from "react-router-dom"
import './auth.css'

const RegisterForm = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('El nombre es requerido')
      .min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: Yup.string()
      .email('Email inválido')
      .required('El email es requerido'),
    password: Yup.string()
      .required('La contraseña es requerida')
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required('Confirmar contraseña es requerido')
  });

  const handleSubmit = async (values) => {
    try {
      await register({
        name: values.name,
        email: values.email,
        password: values.password
      });
      // La redirección la maneja el método register en AuthContext
    } catch (error) {
      console.error("Error durante el registro:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card-container">
        <Card className="auth-card">
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              Campo<span>Hub</span>
            </Link>
            <h2>Registro de Usuario</h2>
            <p className="auth-subtitle">Crea una cuenta para gestionar tu campo</p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, values, errors, touched }) => (
              <Form className="auth-form">
                <div className="form-field">
                  <label htmlFor="name">Nombre</label>
                  <div className="p-input-icon-left w-full">
                    <i className="pi pi-user" style={{ left: '0.75rem' }}/>
                    <InputText
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      className={errors.name && touched.name ? 'p-invalid w-full' : 'w-full'}
                      placeholder="Ingrese su nombre"
                      style={{
                        height: '45px',
                        paddingLeft: '2.5rem',
                        maxWidth: '100%'
                      }}
                    />
                  </div>
                  <small className="p-error"><ErrorMessage name="name" /></small>
                </div>

                <div className="form-field">
                  <label htmlFor="email">Correo electrónico</label>
                  <div className="p-input-icon-left w-full">
                    <i className="pi pi-envelope" style={{ left: '0.75rem' }}/>
                    <InputText
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      className={errors.email && touched.email ? 'p-invalid w-full' : 'w-full'}
                      placeholder="correo@ejemplo.com"
                      style={{
                        height: '45px',
                        paddingLeft: '2.5rem',
                        maxWidth: '100%'
                      }}
                    />
                  </div>
                  <small className="p-error"><ErrorMessage name="email" /></small>
                </div>

                <div className="form-field">
                  <label htmlFor="password">Contraseña</label>
                  <div className="p-input-icon-left w-full">
                    <i className="pi pi-lock" style={{ left: '0.75rem' }}/>
                    <Password
                      id="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      className={errors.password && touched.password ? 'p-invalid w-full' : 'w-full'}
                      inputClassName="w-full"
                      inputStyle={{
                        height: '45px',
                        paddingLeft: '2.5rem',
                        maxWidth: '100%'
                      }}
                      placeholder="Cree su contraseña"
                      feedback
                    />
                  </div>
                  <small className="p-error"><ErrorMessage name="password" /></small>
                </div>

                <div className="form-field">
                  <label htmlFor="confirmPassword">Confirmar contraseña</label>
                  <div className="p-input-icon-left w-full">
                    <i className="pi pi-lock" style={{ left: '0.75rem' }}/>
                    <Password
                      id="confirmPassword"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      className={errors.confirmPassword && touched.confirmPassword ? 'p-invalid w-full' : 'w-full'}
                      inputClassName="w-full"
                      inputStyle={{
                        height: '45px',
                        paddingLeft: '2.5rem',
                        maxWidth: '100%'
                      }}
                      placeholder="Repita su contraseña"
                      feedback={false}
                    />
                  </div>
                  <small className="p-error"><ErrorMessage name="confirmPassword" /></small>
                </div>

                <div className="auth-buttons" style={{marginTop: '1rem', flexDirection: 'column'}}>
                  <Button
                    label="Registrarse"
                    type="submit"
                    className="p-button-primary w-full"
                    icon="pi pi-user-plus"
                  />
                  <Link to="/" className="back-to-home">
                    <Button
                      label="Volver al inicio"
                      type="button"
                      className="p-button-outlined p-button-secondary w-full"
                      icon="pi pi-arrow-left"
                    />
                  </Link>
                </div>
              </Form>
            )}
          </Formik>

          <div className="auth-footer">
            <p>¿Ya tienes una cuenta? <Link to="/inicio-sesion">Iniciar Sesión</Link></p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterForm;