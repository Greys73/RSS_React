import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import SearchLayout from './Layouts/SearchLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<SearchLayout />}>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
