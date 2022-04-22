import Pages from './pages'
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ConfigContextProvider from 'context/configContext';
import AuthContextProvider from 'context/authContext';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ConfigContextProvider>
          <ToastContainer />
          <Pages />
        </ConfigContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
