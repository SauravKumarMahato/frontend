import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
function NavBar(props) {
  const spanStyle = {
    display: 'flex',
     justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#dedede',
    padding: '6px',
    borderRadius: '1rem'
  };
  const logout = {
    color: 'red',
    cursor: 'pointer',
  }
  const section = props.section;
  const id = props.id;
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
      <Container>
          <Navbar.Brand as={Link} to="/Profile">Home</Navbar.Brand> 
          {props.page  && (
            <Nav className="me-auto">
             
              
              <Nav.Link as={Link} to="/syllabus" state = {{section,id}}>Syllabus</Nav.Link> 
              <Nav.Link as={Link} to="/assignments" state = {{section,id}}>Assignments</Nav.Link> 
              <Nav.Link as={Link} to="/resources" state = {{section,id}}>Resources</Nav.Link> 
              <Nav.Link as={Link} to="/plan" state = {{section,id}}>Plan</Nav.Link> 
               

              <span style ={spanStyle}>
              {section}
              </span>
            </Nav>
            
            
          )}
          <Nav.Link as={Link} to="/" state = {{section,id}} style={logout}>Logout</Nav.Link>

        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;