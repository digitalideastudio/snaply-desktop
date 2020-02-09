import { Route } from 'react-router';
import React from 'react';
import Editor from './pages/Editor';
import Login from './pages/Login';

export default function AppRoutes() {
  return (
    <>
      <Route
        exact
        path="/"
        component={Editor}
      />
      <Route
        path="/login"
        component={Login}
      />
    </>
  );
}
