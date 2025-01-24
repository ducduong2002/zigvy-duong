// src/error/ErrorPage.tsx
import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const error = useRouteError(); 

  if (error instanceof Error) {
    return (
      <div>
        <h1>Oops! Something went wrong.</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>An unexpected error occurred.</p>
    </div>
  );
};

export default ErrorPage;
