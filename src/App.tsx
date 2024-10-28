
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import AppRoutes from './routes';
import { MusicPlayerProvider } from './context/MusicPlayerContext';

function App() {
  return (
    <BrowserRouter>
      <MusicPlayerProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </MusicPlayerProvider>
    </BrowserRouter>
  );
}

export default App;