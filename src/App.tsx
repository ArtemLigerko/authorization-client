import { FC, useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import { IUser } from "./types";
import { fetchUsersService } from "./services/UserServive";
import { useAppDispatch, useAppSelector } from "./store/store";
import { userActions } from "./store/reducers/user.reducer";

const App: FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const dispatch = useAppDispatch();
  const authUser = useAppSelector((store) => store.user.authUser);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(userActions.checkAuth({}));
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

  if (authUser.isLoading) {
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
          ? `User is authorized ${authUser.email}`
          : "You need authorize"}
      </h1>
      <h1>
        {authUser.isActivated ? "Account is activated" : "Activate account!"}
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

export default App;
