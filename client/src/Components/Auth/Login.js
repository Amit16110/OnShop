import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";

const Login = ({ history }) => {
  const [email, setEmail] = useState("amit16110@gmail.com");
  const [password, setPassword] = useState("Skooter@12");
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult,
          },
        });
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const handleSubmit = async (e) => {
    //   handle submit
    e.preventDefault();
    setLoading(true);
    // login the user with firebase;
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      console.log(result);
      // update state
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult,
        },
      });
      history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={"Email"}
        autoFocus
      />
      <br />
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={"Password"}
      />
      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        shape="round"
        className="mb-3"
        block
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login
      </Button>
      {/* margin bottom - 3*/}
    </form>
  );

  return (
    <div className="container p-5">
      {/* padding = 5 */}
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? <h4>Loading...</h4> : <h4>Login</h4>}
          {loginForm()}

          <Button
            onClick={googleLogin}
            type="danger"
            shape="round"
            className="mb-3"
            block
            icon={<GoogleOutlined />}
            size="large"
          >
            Login With Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
