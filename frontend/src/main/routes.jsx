import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import App from './app'
import Dashboard from '../dashboard/dashboard'
import BillingCycle from '../billingCycle/billingCycle'
import Auth from '../auth/auth'
import AuthOrApp from './authOrApp'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/app/*' element={<App />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='billingCycles' element={<BillingCycle />} />
      </Route>
      <Route path='/login' element={<Auth />} />
      <Route path='/' element={<AuthOrApp />} />
      <Route path='*' element={<h1>Página não encontrada</h1>} />
    </Routes>
  )
}
