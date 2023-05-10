import React from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  const navigateSignup = () => {
    navigate("/sign-up");
  };
  const navigateSignupAdmin = () => {
    navigate("/sign-up-admin");
  };
  return (
    <>
      <MDBBtn color="light" rippleColor="dark" onClick={navigateSignupAdmin}>
        Admin
      </MDBBtn>
      <MDBBtn color="dark" rippleColor="dark" onClick={navigateSignup}>
        User
      </MDBBtn>
    </>
  );
}
