'use client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { validate_token } from '@utils/auth';

const RouteLogout = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();

    useEffect(() => {
      const checkToken = async () => {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await validate_token(token);
          if (response) {
            Router.replace('/inicio');
          }
        }
      };

      checkToken();
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default RouteLogout;