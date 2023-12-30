import { Container, Row, Col } from 'react-bootstrap';
import './footer.scss'; // Stil dosyanızı ekleyin ve uygun bir şekilde düzenleyin

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col xs={12} sm={6} md={4}>
                        <h4>MOOVIY</h4>
                        <p>Your go-to source for movies and TV shows.</p>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Movies</a></li>
                            <li><a href="#">TV Shows</a></li>
                        </ul>
                    </Col>
                    <Col xs={12} md={4}>
                        <h4>Contact Us</h4>
                        <p>Email: info@mooviy.com</p>
                        <p>Phone: +123 456 789</p>
                    </Col>
                </Row>
            </Container>
            <div className="footer-bottom">
                <Container>
                    <p>&copy; 2023 MOOVIY. All rights reserved.</p>
                </Container>
            </div>
        </footer>
    );
};

export default Footer;
