import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserPage from './pages/UserPage'; // Your user component
import LibrarianPage from './pages/LibrarianPage'; // Your librarian component
import Login from './pages/Login'; // Login component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/librarian" element={<LibrarianPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} /> {/* Redirect to login */}
      </Routes>
    </Router>
  );
}

export default App;
