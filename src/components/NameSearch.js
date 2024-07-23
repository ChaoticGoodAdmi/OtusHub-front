import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NameSearch = ({ token }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [noResultsMessage, setNoResultsMessage] = useState('');

    const handleSearch = async (event) => {
        event.preventDefault();
        if (!firstName && !lastName) {
            setErrorMessage('Введите хотя бы одно поле для поиска');
            return;
        }

        try {
            const response = await axios.get('/user/search', {
                params: {
                    first_name: firstName,
                    last_name: lastName,
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data.length === 0) {
                setNoResultsMessage('Пользователи не найдены');
                setResults([]);
            } else {
                setResults(response.data);
                setNoResultsMessage('');
            }
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.response?.data?.errors || 'Ошибка при загрузке данных');
            setResults([]);
            setNoResultsMessage('');
        }
    };

    return (
        <Container className="p-4">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="mb-4">Поиск пользователя по имени</h2>
                    <Form onSubmit={handleSearch}>
                        <Form.Group controlId="formFirstName" className="mb-3">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите имя"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formLastName" className="mb-3">
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите фамилию"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">Найти</Button>
                    </Form>
                    {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
                    {noResultsMessage && <Alert variant="warning" className="mt-3">{noResultsMessage}</Alert>}
                    {results.length > 0 && (
                        <div className="mt-3">
                            <h3>Результаты поиска</h3>
                            {results.map((user) => (
                                <div key={user.id} className="mb-3">
                                    <p><strong>ID:&emsp;</strong> {user.id}</p>
                                    <p><strong>Имя:&emsp;</strong> {user.firstName}</p>
                                    <p><strong>Фамилия:&emsp;</strong> {user.secondName}</p>
                                    <p><strong>Дата рождения:&emsp;</strong> {user.birthDate}</p>
                                    <p><strong>Пол:&emsp;</strong> {user.sex}</p>
                                    <p><strong>Биография:&emsp;</strong> {user.biography}</p>
                                    <p><strong>Город:&emsp;</strong> {user.city}</p>
                                    <Link to={`/user/${user.id}`}>Перейти к профилю</Link>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default NameSearch;
