
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../actions/userActions';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';


const RegisterScreen = (props) => {

  const { location, history } = props;
  
  const redirect = location.search ? location.search.split("=")[1] : '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const userRegister = useSelector(state => state.userRegister);
  const { error, loading, userInfo } = userRegister;
  
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage("Password do not match")
    } else {
      dispatch(register(name,email, password));
    }

  };

  return (
    <FormContainer>
      <h1>Register a new account</h1>
      { message && <Message variant='danger'>{message}</Message>}
      { error && <Message variant='danger'>{error}</Message>}
      { loading && <Loader/>}
      <Form onSubmit={submitHandler}>

      <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={e => setName(e.target.value)}
            required
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={ e => setEmail(e.target.value)}
            required
          >
          </Form.Control>
        </Form.Group>
        
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={ e => setPassword(e.target.value)}
            required
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={confirmPassword}
            onChange={ e => setConfirmPassword(e.target.value)}
            required
          >
          </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>Register</Button>
      </Form>

      <Row className="py-3">
        <Col>
          Do you have an account? <Link
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
            >
              Log in
            </Link>
        </Col>
      </Row>

    </FormContainer>
  )
}

export default RegisterScreen
