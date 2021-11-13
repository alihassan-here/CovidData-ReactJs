import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
function NavbarScreen() {
    return (
        <Navbar bg="success" variant="dark">
            <Container>
                <Navbar.Brand href="#">
                    React Excel Data Export
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default NavbarScreen;
