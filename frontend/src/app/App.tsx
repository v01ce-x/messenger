import { RouterProvider } from 'react-router/dom';
import { router } from '@/app/providers';

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
