import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function NavBar({setQuery}) {
    const [search,setSearch] = useState("");

    const handleFormSubmit = () => {
        if(search) {
            setQuery(search.trim())
        }
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid="sm">
                <Link className='no-underline-link' to="/">
                    <Navbar.Brand>MOOVIY</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Link className='no-underline-link' to="/favorites">
                            <Nav.Link>Favorites</Nav.Link>
                        </Link>
                    </Nav>
                    <Form onSubmit={(e) => e.preventDefault()} className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={(e)=>setSearch(e.target.value)}
                        />
                        <Button onClick={handleFormSubmit} variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

NavBar.propTypes = {
    setQuery: PropTypes.func,
};
export default NavBar;