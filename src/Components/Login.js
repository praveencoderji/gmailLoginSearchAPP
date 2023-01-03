import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
 
`;

const Login = () => {
  const clientId =
    "929613772790-t5oridhcs7ip2223igdhnsnr4c6l4b42.apps.googleusercontent.com";
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const onSuccess = (res) => {
    localStorage.setItem("user",JSON.stringify(res.profileObj));
     localStorage.setItem("accessToken",res.accessToken)
     window.reload();
  };
  const onFailure = (err) => {
    console.log("failed:", err);
  };
  return (
    <Container>
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </Container>
  );
};
export default Login;
