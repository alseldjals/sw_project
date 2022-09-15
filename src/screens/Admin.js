import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { useState } from "react";
import styled from "styled-components";
import Form from "../components/Form";
import { app } from "../firebase";

const Login = styled.div`
  width: 100%;
`;
const Admin = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();
  const onSubmit = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, pw)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoggedIn(true);
        setError(error);
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "pw") {
      setPw(value);
    }
  };
  const onLogout = () => {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
        setEmail("");
        setPw("");
      })
      .catch((error) => {
        setError(error);
      });
  };
  return (
    <>
      {!isLoggedIn ? (
        <Login>
          <form onSubmit={onSubmit}>
            <input
              onChange={onChange}
              name="email"
              type="email"
              placeholder="이메일"
            />
            <input
              onChange={onChange}
              name="pw"
              type="password"
              placeholder="비밀번호"
            />
            <button>로그인</button>
          </form>
        </Login>
      ) : (
        <>
          <Form />
          <button onClick={onLogout}>logout</button>
        </>
      )}
      <h1>{error ? error : null}</h1>
    </>
  );
};
export default Admin;
