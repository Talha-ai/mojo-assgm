import { Navigate } from 'react-router-dom';
import useUser from './useUser';
import { CircularProgress } from '@mui/material';

const RequireAuth = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) {
    return <CircularProgress />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequireAuth;
