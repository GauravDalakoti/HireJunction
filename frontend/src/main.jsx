import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './components/home/Home.jsx'
import Login from './components/login/Login.jsx'
import SignUp from './components/signUp/SignUp.jsx'
import ReqruiterPage from './pages/ReqruiterPage.jsx'
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.jsx"
import { Provider } from 'react-redux'
import store from './store/store.js'
import Jobs from './components/jobs/Jobs.jsx'
import AllJobs from './components/allJobs/AllJobs.jsx'
import LatestJob from './components/latestJobs/LatestJob.jsx'
import AddNewJobs from './components/addNewJobs/AddNewJobs.jsx'
import ReqruiterAllJobs from './components/reqruiterAllJobs/ReqruiterAllJobs.jsx'
import JobApplications from './components/allJobApplications/allJobApplications.jsx'
import ApplyJob from './pages/ApplyJob.jsx'
import Profile from './pages/Profile.jsx'
import YourJobs from './pages/YourJobs.jsx'
import UserProtectedRoute from './components/protectedRoute/UserProtectedRoute.jsx'

const router = createBrowserRouter(

  createRoutesFromElements(
    <>
      <Route path='' element={<App />}>

        <Route path='/' element={<Jobs />} />
        <Route path='jobs' element={<Jobs />} />
        <Route path='all-jobs' element={<AllJobs />} />
        <Route path='latest-jobs' element={<LatestJob />} />
        <Route path='profile-page' element={<UserProtectedRoute><Profile /></UserProtectedRoute>} />
        <Route path='your-jobs' element={<UserProtectedRoute><YourJobs /></UserProtectedRoute>} />

        <Route path='login' element={<Login />} />
        <Route path='sign-up' element={<SignUp />} />
        <Route path='apply-job/:_id' element={<UserProtectedRoute><ApplyJob /></UserProtectedRoute>} />

      </Route>

      <Route path='reqruiter-page' element={<ProtectedRoute authentication> <ReqruiterPage /></ProtectedRoute>}>

        <Route path='/reqruiter-page' element={<AddNewJobs />} />
        <Route path='/reqruiter-page/add-new-jobs' element={<AddNewJobs />} />
        <Route path='/reqruiter-page/reqruiter-all-jobs' element={<ReqruiterAllJobs />} />
        <Route path='/reqruiter-page/job-applications' element={<JobApplications />} />

      </Route>

    </>
  )
)

createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <RouterProvider router={router}>

    </RouterProvider>
  </Provider>
)
