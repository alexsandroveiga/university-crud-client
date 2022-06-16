import { AppRoutes } from '@/routes'
import { AuthProvider, StoreProvider } from '@/contexts';
import { QueryClient, QueryClientProvider } from 'react-query'
import 'App.css'

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>        
        <StoreProvider>
          <AppRoutes />
          <ToastContainer />
        </StoreProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
