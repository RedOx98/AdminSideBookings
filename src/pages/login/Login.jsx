import axios from "axios";
import { useContext } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";
// import { AuthContext } from "../../context/AuthContext";

const Container = styled.div`
  width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    
    background-size: cover;

    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper= styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
`;
const LContainer = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
    margin: 20px 0px;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    &:disabled{
        color: green;
        cursor: not-allowed;
    }
`
const Error = styled.span`
    color: red;
`;


const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
      setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
      e.preventDefault();
      dispatch({ type: "LOGIN START" });
      try {
        const res = await axios.post("/api/auth/login", credentials);
        if(res.data.isAdmin){
          dispatch({ type: "LOGIN SUCCESS", payload: res.data.details });
          navigate("/")
        }else {
          dispatch({ type: "LOGIN FAILURE", payload: {message : "You are not allowed!"}});
        }
      } catch (err) {
        dispatch({ type: "LOGIN FAILURE", payload: err.response.data })
      }
    }


  return (
    <Container>
    <Wrapper>
    <Form>
      <LContainer type="text" id="username" onChange={handleChange} placeholder="username"/>
      <LContainer type="password" id="password" onChange={handleChange} placeholder="password"/>
      <Button disabled={loading} onClick={handleClick} >Login</Button>
      {error && <Error>user not found!</Error>}
      </Form>
      </Wrapper>
    </Container>
  )
}

export default Login
