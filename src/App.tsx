import React, { FC, useEffect, useContext, useState } from "react";
import { Context } from "./index";
import LoginForm from "./components/LoginForm";
import { observer } from "mobx-react-lite";
import { IUser } from "./models/IUser";
import { fetchUsersService } from "./services/UserServive";
import { useAppDispatch, useAppSelector } from "./store/store-redux";
import { userActions } from "./store/reducers/user.reducer";

const App: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  const dispatch = useAppDispatch();
  const authUser = useAppSelector((store) => store.user.authUser);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  const getUsers = async () => {
    try {
      const response = await fetchUsersService();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  if (store.isLoading) {
    return <div>Loading...</div>;
  }

  if (!authUser.isAuth) {
    return (
      <div>
        <LoginForm />
        <button onClick={getUsers}>Get users</button>
      </div>
    );
  }

  return (
    <div>
      <h1>
        {authUser.isAuth
          ? `User is authorized ${store.user.email}`
          : "You need authorize"}
      </h1>
      <h1>
        {authUser.isActivated ? "Account activated" : "Activate account!"}
      </h1>
      <button onClick={() => dispatch(userActions.logout())}>Logout</button>
      <div>
        <button onClick={getUsers}>Get users</button>
      </div>
      {users.map((user) => (
        <div key={user.email}>{user.email}</div>
      ))}
    </div>
  );
};

export default observer(App); //observe need for mobx working
