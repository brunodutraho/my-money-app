import { combineReducers } from 'redux'

import { reducer as toastrReducer } from 'react-redux-toastr'
import BillingCycleReducer from '../billingCycle/billingCycleReducer'
import TabReducer from '../common/tab/tabReducer'
import DashboardReducer from '../dashboard/dashboardReducer'
import AuthReducer from '../auth/authReducer'

const rootReducer = combineReducers({
  dashboard: DashboardReducer,
  tab: TabReducer,
  billingCycle: BillingCycleReducer,
  toastr: toastrReducer,
  auth: AuthReducer,
})

export default rootReducer
