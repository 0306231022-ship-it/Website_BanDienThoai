import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrangChuWeb from './JSX/TrangChu/TrangChuWeb';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TrangChuWeb />} />
      </Routes>
    </Router>
  );
}

export default App;

