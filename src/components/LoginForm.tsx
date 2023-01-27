import { FC, useState } from "react";
import { useAppDispatch } from "../store/store";
import { userActions } from "../store/reducers/user.reducer";

const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const login = () => {
    dispatch(userActions.login({ email, password }));
  };

  const registration = () => {
    dispatch(userActions.registration({ email, password }));
  };

  return (
    <div>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder="Email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Password"
      />
      <button onClick={login}>Login</button>
      <button onClick={registration}>Registration</button>
    </div>
  );
};

export default LoginForm;
