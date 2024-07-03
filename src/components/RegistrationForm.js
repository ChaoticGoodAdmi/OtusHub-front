import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './RegistrationForm.css';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

const RegistrationForm = () => {
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [sex, setSex] = useState('');
    const [biography, setBiography] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        if (!firstName) newErrors.firstName = 'Имя обязательно';
        if (!secondName) newErrors.secondName = 'Фамилия обязательна';
        if (!birthDate) newErrors.birthDate = 'Дата рождения обязательна';
        if (!sex) newErrors.sex = 'Пол обязателен';
        if (!biography) newErrors.biography = 'Биография обязательна';
        if (biography.length > 200) newErrors.biography = 'Биография не может быть длиннее 200 символов';
        if (!city) newErrors.city = 'Город обязателен';
        if (!password) newErrors.password = 'Пароль обязателен';
        if (!confirmPassword) newErrors.confirmPassword = 'Подтверждение пароля обязательно';
        if (password !== confirmPassword) newErrors.passwordMatch = 'Пароли не совпадают';

        const birthDateObj = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }
        if (age < 18) newErrors.age = 'Регистрация разрешена только лицам старше 18 лет';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await api.post('/user/register', {
                firstName,
                secondName,
                birthDate,
                sex,
                biography,
                city,
                password
            });
            const userId = response.data.userId;
            navigate('/login', { state: { message: `Вы зарегистрированы по id: ${userId}` } });
        } catch (error) {
            alert('Ошибка регистрации');
        }
    };

    return (
        <Container className="p-4">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="mb-4">Регистрация</h2>
                    <Form onSubmit={handleSubmit} className="needs-validation">
                        <Form.Group controlId="formFirstName" className="mb-3">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите имя"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                isInvalid={!!errors.firstName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.firstName}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formSecondName" className="mb-3">
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите фамилию"
                                value={secondName}
                                onChange={(e) => setSecondName(e.target.value)}
                                isInvalid={!!errors.secondName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.secondName}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBirthDate" className="mb-3">
                            <Form.Label>Дата рождения</Form.Label>
                            <Form.Control
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                isInvalid={!!errors.birthDate || !!errors.age}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.birthDate || errors.age}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formSex" className="mb-3">
                            <Form.Label>Пол</Form.Label>
                            <Form.Control
                                as="select"
                                value={sex}
                                onChange={(e) => setSex(e.target.value)}
                                isInvalid={!!errors.sex}
                            >
                                <option value="">Выберите</option>
                                <option value="MALE">Мужской</option>
                                <option value="FEMALE">Женский</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.sex}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBiography" className="mb-3">
                            <Form.Label>Биография</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Введите биографию"
                                value={biography}
                                onChange={(e) => setBiography(e.target.value)}
                                isInvalid={!!errors.biography}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.biography}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formCity" className="mb-3">
                            <Form.Label>Город</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите город"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                isInvalid={!!errors.city}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.city}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Введите пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formConfirmPassword" className="mb-3">
                            <Form.Label>Подтвердите пароль</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Подтвердите пароль"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                isInvalid={!!errors.confirmPassword || !!errors.passwordMatch}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.confirmPassword || errors.passwordMatch}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">Зарегистрироваться</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default RegistrationForm;
