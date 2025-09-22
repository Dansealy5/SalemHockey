import { createRoot } from 'react-dom/client';
import App from './client/Components/App';
import { BrowserRouter } from 'react-router-dom';
import "./index.css";
import { AuthProvider } from './client/Components/Context/AuthContext';

const root = createRoot(document.querySelector('#root'));

root.render(
    <BrowserRouter>
      <AuthProvider>
          <App />
      </AuthProvider>
    </BrowserRouter>
);
