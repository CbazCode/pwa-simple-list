import './App.css';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Home';
import About from './About';
import Users from './Users';


function App() {
  return (
    <div className="App">
      <Router>
      <div>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand><Link to="/">PWA</Link></Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link ><Link to="/">Home</Link></Nav.Link>
          <Nav.Link ><Link to="/users">Users</Link></Nav.Link>
          <Nav.Link ><Link to="/about">About</Link></Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-light">Search</Button>
        </Form>
      </Navbar>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about" component= {About}/>
          <Route path="/users" component= {Users}/>
          <Route exact path="/" component= {Home}/>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
