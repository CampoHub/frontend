import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { InputText } from "primereact/inputtext"
import { Password } from 'primereact/password'
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { Link, useNavigate } from "react-router-dom"
import './auth.css'

const LoginForm = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate()
    const initialValuesUser = {
        email: '',
        password: ''
    }
    const validationSchemaUser = Yup.object({
        email: Yup.string().email('Email inválido').required('Campo requerido'),
        password: Yup.string().required('Campo requerido')
    })

    const onSubmitLogin = async (values) => {
        try {
            await login(values);
            // Redirigir al panel de control después del inicio de sesión exitoso
            navigate('/dashboard');
        } catch (error) {
            console.error("Error durante el inicio de sesión:", error);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card-container">
                <Card className="auth-card">
                    <div className="auth-header">
                        <Link to="/" className="auth-logo">
                            Campo<span>Hub</span>
                        </Link>
                        <h2>Iniciar Sesión</h2>
                        <p className="auth-subtitle">Accede a tu cuenta para gestionar tu campo</p>
                    </div>

                    <Formik
                        initialValues={initialValuesUser}
                        validationSchema={validationSchemaUser}
                        onSubmit={onSubmitLogin}
                    >
                        {({handleChange, values, errors, touched}) => (
                            <Form className="auth-form">
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
                                                maxWidth: '100%'
                                            }}
                                            placeholder="Ingrese su contraseña"
                                            feedback={false}
                                        />
                                    </div>
                                    <small className="p-error"><ErrorMessage name="password" /></small>
                                </div>

                                <div className="forgot-password">
                                    <Link to="/clave-olvidada">¿Olvidó su contraseña?</Link>
                                </div>

                                <div className="auth-buttons" style={{marginTop: '1rem', flexDirection: 'column'}}>
                                    <Button 
                                        label="Iniciar Sesión" 
                                        type="submit" 
                                        className="p-button-primary w-full"
                                        icon="pi pi-sign-in"
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
                        <p>¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link></p>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default LoginForm