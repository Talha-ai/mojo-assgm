import Home from './components/Home';
import LoginPage from './components/LoginPage';
import { createBrowserRouter, Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-full">
      <Outlet />
    </div>
  );
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
]);

export default appRouter;
