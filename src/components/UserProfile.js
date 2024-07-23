import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './UserProfile.css';

const UserProfile = ({ token }) => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [searchId, setSearchId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const fetchUserProfile = async (userId) => {
        try {
            const response = await axios.get(`/user/get/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setProfile(response.data);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.response?.data?.errors || 'Ошибка при загрузке данных профиля');
            setProfile(null);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchUserProfile(searchId);
    };

    useEffect(() => {
        fetchUserProfile(id);
    }, [id]);

    const translateGender = (gender) => {
        if (gender === "MALE") return "Мужской";
        if (gender === "FEMALE") return "Женский";
        return gender;
    };

    return (
        <Container className="p-4">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="mb-4">Профиль пользователя</h2>
                    <Form onSubmit={handleSubmit} className="needs-validation">
                        <Form.Group controlId="formSearchId" className="mb-3">
                            <Form.Label>Найти пользователя по ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите ID пользователя"
                                value={searchId}
                                onChange={(e) => setSearchId(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">Поиск</Button>
                    </Form>
                    <Link to="/search" className="btn btn-secondary w-100 mt-3">Поиск по имени</Link>
                    {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
                    {profile && (
                        <div className="mt-3">
                            <h3>Детали профиля</h3>
                            <p><i className="bi bi-person-fill"></i> <strong>ID:&emsp;</strong> {profile.id}</p>
                            <p><i className="bi bi-person-fill"></i> <strong>Имя:&emsp;</strong> {profile.firstName}</p>
                            <p><i className="bi bi-person-fill"></i> <strong>Фамилия:&emsp;</strong> {profile.secondName}</p>
                            <p><i className="bi bi-calendar-fill"></i> <strong>Дата рождения:&emsp;</strong> {profile.birthDate}</p>
                            <p><i className="bi bi-gender-ambiguous"></i> <strong>Пол:&emsp;</strong> {translateGender(profile.sex)}</p>
                            <p><i className="bi bi-book-fill"></i> <strong>Биография:&emsp;</strong> {profile.biography}</p>
                            <p><i className="bi bi-geo-alt-fill"></i> <strong>Город:&emsp;</strong> {profile.city}</p>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default UserProfile;
