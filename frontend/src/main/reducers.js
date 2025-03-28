import { combineReducers } from 'redux'

import DashboardReducer from '../dashbord/dashboardReducer'

const rootReducer = combineReducers({
    dashboard: DashboardReducer
})

export default rootReducer