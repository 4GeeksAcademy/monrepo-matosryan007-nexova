import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TalentPage from './pages/TalentPage';
import { paths } from './content';

/** Scroll to the #hash target after navigation, or to the top when there is none. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path={paths.en.home} element={<HomePage locale="en" />} />
        <Route path={paths.en.talent} element={<TalentPage locale="en" />} />
        <Route path={paths.es.home} element={<HomePage locale="es" />} />
        <Route path={paths.es.talent} element={<TalentPage locale="es" />} />
        <Route path="*" element={<HomePage locale="en" />} />
      </Routes>
    </>
  );
}
