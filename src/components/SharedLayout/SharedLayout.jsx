import css from "./SharedLayout.module.css";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Suspense } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";

export default function SharedLayout() {
  const { isLoggedIn, user } = useAuth();
  const dispatch = useDispatch();
  return (
    <>
      <header className={css.header}>
        <div className={css.container}>
          <div className={css.menu}>
            <NavLink to="/contacts" className={css.headerLink}>
              Contacts
            </NavLink>
            {isLoggedIn ? (
              <div className={css.user}>
                <p>Welcome, {user.name}</p>
                <button type="button" onClick={() => dispatch(logOut())}>
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <NavLink to="/login" className={css.headerLink}>
                  Login
                </NavLink>
                <NavLink to="/register" className={css.headerLink}>
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </header>
      <main>
        <div className={css.container}>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </>
  );
}
