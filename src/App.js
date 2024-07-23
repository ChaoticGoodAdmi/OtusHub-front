import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import UserProfile from './components/UserProfile';
import NameSearch from './components/NameSearch'; // Import the new component
import { Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import logo from './assets/logo.png';

const App = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const handleLogin = (token, userId) => {
        setToken(token);
        setUserId(userId);
    };

    const handleLogout = () => {
        setToken(null);
        setUserId(null);
    };

    return (
        <Router>
            <Container className="p-4">
                <Navbar bg="dark" variant="dark" className="mb-4">
                    <Navbar.Brand as={Link} to="/" onClick={handleLogout}>
                        <img src={logo} alt="OtusHub Logo" height="30" className="d-inline-block align-top" />{' '}
                        OtusHub
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/register">
                            <i className="bi bi-person-plus-fill"></i> Регистрация
                        </Nav.Link>
                        <Nav.Link as={Link} to="/search">
                            <i className="bi bi-search"></i> Поиск по имени
                        </Nav.Link>
                    </Nav>
                </Navbar>
                <Routes>
                    <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
                    <Route path="/register" element={<RegistrationForm />} />
                    <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                    <Route path="/user/:id" element={token ? <UserProfile token={token} /> : <Navigate to="/" />} />
                    <Route path="/search" element={token ? <NameSearch token={token} /> : <Navigate to="/" />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;