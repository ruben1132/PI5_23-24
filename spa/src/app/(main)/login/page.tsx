import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from '@/components/forms/LoginForm';
import LoginRoute from '@/privateRoutes/LoginRoute';

export default function Login() {
    return (
        <LoginRoute>
            <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
                {/* Logo */}
                <Row className="mb-4">
                    <Col>
                        <Image src="/logo.png" alt="Logo" width={90} height={100} />
                    </Col>
                </Row>

                {/* User Form */}
                <Row>
                    <Col>
                        <LoginForm />
                    </Col>
                </Row>
            </Container>
        </LoginRoute>
    );
}
