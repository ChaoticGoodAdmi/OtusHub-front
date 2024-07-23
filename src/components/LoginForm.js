import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './LoginForm.css';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

const LoginForm = ({ onLogin }) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/login', {
                userId,
                password
            });
            onLogin(response.data.token, userId);
            navigate(`/user/${userId}`);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Ошибка авторизации: пользователь не найден');
        }
    };

    return (
        <Container className="p-4">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="mb-4">Вход</h2>
                    {location.state?.message && <Alert variant="success">{location.state.message}</Alert>}
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    <Form onSubmit={handleSubmit} className="needs-validation">
                        <Form.Group controlId="formUserId" className="mb-3">
                            <Form.Label>ID пользователя</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите ID пользователя"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Введите пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">Войти</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;
