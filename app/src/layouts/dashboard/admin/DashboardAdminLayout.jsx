import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from '../../../components/Sidebar';
import '../dashboard.css';

export default function DashboardAdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-container">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="main-content">
        <div className="content-wrapper p-3">
          <div className="flex justify-content-between align-items-center mb-3">
            <h1 className="text-2xl font-bold m-0">Panel de Administración</h1>
          </div>

          <div className="grid">
            <div className="col-12 lg:col-6 xl:col-3">
              <div className="card mb-0 shadow-1">
                <div className="flex justify-content-between mb-3">
                  <div>
                    <span className="block text-500 font-medium mb-3">Usuarios Totales</span>
                    <div className="text-900 font-medium text-xl">152</div>
                  </div>
                  <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                    <i className="pi pi-users text-blue-500 text-xl"/>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 lg:col-6 xl:col-3">
              <div className="card mb-0 shadow-1">
                <div className="flex justify-content-between mb-3">
                  <div>
                    <span className="block text-500 font-medium mb-3">Parcelas Activas</span>
                    <div className="text-900 font-medium text-xl">28</div>
                  </div>
                  <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                    <i className="pi pi-map text-green-500 text-xl"/>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 lg:col-6 xl:col-3">
              <div className="card mb-0 shadow-1">
                <div className="flex justify-content-between mb-3">
                  <div>
                    <span className="block text-500 font-medium mb-3">Actividades</span>
                    <div className="text-900 font-medium text-xl">85</div>
                  </div>
                  <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                    <i className="pi pi-calendar text-orange-500 text-xl"/>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 lg:col-6 xl:col-3">
              <div className="card mb-0 shadow-1">
                <div className="flex justify-content-between mb-3">
                  <div>
                    <span className="block text-500 font-medium mb-3">Recursos</span>
                    <div className="text-900 font-medium text-xl">42</div>
                  </div>
                  <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                    <i className="pi pi-box text-purple-500 text-xl"/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-1 mt-3">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
