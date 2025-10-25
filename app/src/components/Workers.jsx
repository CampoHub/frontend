import WorkersList from './workers/WorkersList';
import { WorkersProvider } from '../context/WorkersContext';
import Sidebar from './Sidebar';
import '../layouts/dashboard/dashboard.css';

const Workers = () => {
  return (
    <WorkersProvider>
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <div className="grid">
            <div className="col-12">
              <div className="card">
                <h2 className="title">Trabajadores</h2>
                <WorkersList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </WorkersProvider>
  );
};

export default Workers;