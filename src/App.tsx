import { Route, Routes } from 'react-router-dom';
import NotFound from './Pages/NotFound/NotFound';
import MainPage from './Pages/MainPage/MainPage';
import UseRefPage from './Pages/UseRefPage/UseRefPage';
import UseHookPage from './Pages/UseHookPage/UseHookPage';

function App() {
  return (
    <Routes>
      <Route path="/" index element={<MainPage />} />
      <Route path="useref" index element={<UseRefPage />} />
      <Route path="usehook" index element={<UseHookPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
