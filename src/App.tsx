import { Route, Routes } from 'react-router-dom';
import SearchLayout from './Layouts/SearchLayout';
import NotFound from './Pages/NotFound/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchLayout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
