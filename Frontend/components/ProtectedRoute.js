'use client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { validate_token } from '@utils/auth';

const ProtectedRoute = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          Router.replace('/');
        } else {
          const response = await validate_token(token);
          if (!response) {
            Router.replace('/');
          }
        }
      };

      checkAuth();
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default ProtectedRoute;
