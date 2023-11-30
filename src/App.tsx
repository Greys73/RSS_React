import { Route, Routes } from 'react-router-dom';
import NotFound from './Pages/NotFound/NotFound';
import MainPage from './Pages/MainPage/MainPage';
import UseRefPage from './Pages/UseRefPage/UseRefPage';
import UseStatePage from './Pages/UseStatePage/UseStatePage';

function App() {
  return (
    <Routes>
      <Route path="/" index element={<MainPage />} />
      <Route path="useref" index element={<UseRefPage />} />
      <Route path="usestate" index element={<UseStatePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
