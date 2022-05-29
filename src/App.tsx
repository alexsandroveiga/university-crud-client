import { AppRoutes } from '@/routes'
import { StoreProvider } from '@/contexts';
import { QueryClient, QueryClientProvider } from 'react-query'
import 'App.css'

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient()

function App() {
  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <ToastContainer />
      </QueryClientProvider>
    </StoreProvider>
  )
}

export default App
