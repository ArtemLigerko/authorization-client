import React, { FC, useState, useContext } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { useAppDispatch } from "../store/hooks";
import { userActions } from "../store/reducers/user.reducer";

const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store } = useContext(Context);

  const dispatch = useAppDispatch();

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
      {/* <button onClick={() => store.login(email, password)}>Login</button> */}
      <button onClick={() => dispatch(userActions.login({ email, password }))}>
        Login
      </button>
      <button onClick={() => store.registration(email, password)}>
        Registration
      </button>
    </div>
  );
};

export default observer(LoginForm);
