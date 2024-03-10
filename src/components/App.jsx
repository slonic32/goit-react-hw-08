import { useEffect, lazy } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectLoading, selectError } from "../redux/selectors.js";
import Loader from "./Loader/Loader";
import Error from "./Error/Error";
import { refreshUser } from "../redux/auth/operations";
import { useAuth } from "../hooks";
import { Route, Routes, Navigate } from "react-router-dom";
import RestrictedRoute from "../components/RestrictedRoute";
import PrivateRoute from "../components/PrivateRoute";

const Contacts = lazy(() => import("../pages/Contacts.jsx"));
const Register = lazy(() => import("../pages/Register.jsx"));
const Login = lazy(() => import("../pages/Login.jsx"));
import SharedLayout from "./SharedLayout/SharedLayout";

export default function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <div className="container">
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Navigate to="/contacts" />} />
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<Contacts />} />
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<Register />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/contacts" component={<Login />} />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/contacts" />} />
      </Routes>

      {loading && <Loader />}
      {error && <Error />}
    </div>
  );
}
