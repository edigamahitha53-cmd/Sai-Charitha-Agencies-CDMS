import { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../assets/styles/navbar.css";

function NavigationBar() {

  const [loggedInShop, setLoggedInShop] = useState(
    localStorage.getItem("loggedInShop")
  );

  useEffect(() => {

    // Check login status
    const checkLoginStatus = () => {

      setLoggedInShop(
        localStorage.getItem("loggedInShop")
      );

    };

    // Check when page changes / storage changes
    window.addEventListener(
      "storage",
      checkLoginStatus
    );

    window.addEventListener(
      "shopLoginStatusChanged",
      checkLoginStatus
    );

    return () => {

      window.removeEventListener(
        "storage",
        checkLoginStatus
      );

      window.removeEventListener(
        "shopLoginStatusChanged",
        checkLoginStatus
      );

    };

  }, []);

  return (
    <Navbar expand="lg" className="custom-navbar" sticky="top">

      <Container fluid className="px-lg-5">

        {/* Company Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="brand-name"
        >
          🍫 Sai Charitha Agencies
        </Navbar.Brand>


        {/* Mobile Menu Button */}
        <Navbar.Toggle aria-controls="navbar-nav" />


        <Navbar.Collapse id="navbar-nav">

          {/* Navigation Menu */}
          <Nav className="mx-auto">

            <Nav.Link
              as={Link}
              to="/"
              className="nav-link-custom"
            >
              Home
            </Nav.Link>


            <Nav.Link
              href="#brands"
              className="nav-link-custom"
            >
              Brands
            </Nav.Link>


            <Nav.Link
              href="#features"
              className="nav-link-custom"
            >
              Features
            </Nav.Link>


            <Nav.Link
              href="#contact"
              className="nav-link-custom"
            >
              Contact
            </Nav.Link>

          </Nav>


          {/* Right Side Buttons */}
          <div className="d-flex align-items-center">

            {!loggedInShop ? (

              <>
                <Button
                  as={Link}
                  to="/login"
                  className="login-btn me-2"
                >
                  Shop Login
                </Button>


                <Button
                  as={Link}
                  to="/register"
                  className="register-btn me-2"
                >
                  Register
                </Button>
              </>

            ) : (

              <Button
                as={Link}
                to="/shop-dashboard"
                className="login-btn me-2"
              >
                Shop Dashboard
              </Button>

            )}


            {/* Admin Login */}
            <Button
              as={Link}
              to="/admin-login"
              className="admin-btn"
            >
              Admin Login
            </Button>

          </div>

        </Navbar.Collapse>

      </Container>

    </Navbar>
  );
}

export default NavigationBar;