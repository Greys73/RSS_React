import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import SearchLayout from './Layouts/SearchLayout';

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<SearchLayout />} />)
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
