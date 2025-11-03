import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { useAuth } from '../../context/AuthContext';
import userService from '../../services/user';
import Sidebar from '../Sidebar';
import '../../layouts/dashboard/dashboard.css';

const Profile = () => {
    const { user } = useAuth();
    const toast = useRef(null);
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        loadUserProfile();
    }, []);

    const loadUserProfile = async () => {
        try {
            setLoading(true);
            const response = await userService.getUserProfile();
            setProfileData(response.data);
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo cargar la información del perfil'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await userService.updateProfile(profileData);
            toast.current.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Perfil actualizado correctamente'
            });
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: error.response?.data?.message || 'Error al actualizar el perfil'
            });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Las contraseñas no coinciden'
            });
            return;
        }

        try {
            setLoading(true);
            await userService.changePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            toast.current.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Contraseña actualizada correctamente'
            });
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: error.response?.data?.message || 'Error al cambiar la contraseña'
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="app-container">
                <Sidebar />
                <div className="main-content">
                    <div className="flex justify-center items-center h-screen">
                        <i className="pi pi-spinner pi-spin" style={{ fontSize: '2rem' }}></i>
                    </div>
                </div>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="app-container">
                <Sidebar />
                <div className="main-content">
                    <div className="p-4">
                        <div className="text-red-500">No se pudo cargar la información del perfil</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content overflow-y-auto">
                <div className="p-4">
                    <Toast ref={toast} />
                    
                    <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>
                    
                    <div className="grid">
                        <div className="col-12 md:col-6">
                            <Card title="Información Personal" className="mb-4">
                                <form onSubmit={handleProfileUpdate}>
                                    <div className="p-fluid">
                                        <div className="field mb-4">
                                            <label htmlFor="nombre" className="block mb-2">Nombre</label>
                                            <InputText
                                                id="nombre"
                                                value={profileData.nombre || ''}
                                                onChange={(e) => setProfileData({...profileData, nombre: e.target.value})}
                                            />
                                        </div>
                                        <div className="field mb-4">
                                            <label htmlFor="email" className="block mb-2">Email</label>
                                            <InputText
                                                id="email"
                                                type="email"
                                                value={profileData.email || ''}
                                                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                                            />
                                        </div>
                                        <div className="field mb-4">
                                            <label htmlFor="rol" className="block mb-2">Rol</label>
                                            <InputText
                                                id="rol"
                                                value={profileData.rol || ''}
                                                disabled
                                            />
                                        </div>
                                        <Button 
                                            type="submit" 
                                            label="Guardar Cambios"
                                            icon="pi pi-check"
                                            loading={loading}
                                        />
                                    </div>
                                </form>
                            </Card>
                        </div>

                        <div className="col-12 md:col-6">
                            <Card title="Cambiar Contraseña" className="mb-4">
                                <form onSubmit={handlePasswordChange}>
                                    <div className="p-fluid">
                                        <div className="field mb-4">
                                            <label htmlFor="currentPassword" className="block mb-2">Contraseña Actual</label>
                                            <Password
                                                id="currentPassword"
                                                value={passwordData.currentPassword}
                                                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                                feedback={false}
                                                toggleMask
                                            />
                                        </div>
                                        <div className="field mb-4">
                                            <label htmlFor="newPassword" className="block mb-2">Nueva Contraseña</label>
                                            <Password
                                                id="newPassword"
                                                value={passwordData.newPassword}
                                                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                                toggleMask
                                            />
                                        </div>
                                        <div className="field mb-4">
                                            <label htmlFor="confirmPassword" className="block mb-2">Confirmar Nueva Contraseña</label>
                                            <Password
                                                id="confirmPassword"
                                                value={passwordData.confirmPassword}
                                                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                                feedback={false}
                                                toggleMask
                                            />
                                        </div>
                                        <Button 
                                            type="submit" 
                                            label="Cambiar Contraseña"
                                            icon="pi pi-key"
                                            loading={loading}
                                        />
                                    </div>
                                </form>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;