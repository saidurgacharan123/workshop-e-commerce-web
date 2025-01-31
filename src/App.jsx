import React, { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';  // Import the router from your routes file

function App() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
