import React from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router'

import Dashboard from '../dashbord/dashboard'
import BillingCycle from '../billingCycle/billingCycle'

export default props => (
    <HashRouter>
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='billingCycles' element={<BillingCycle />} />
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    </HashRouter>
)