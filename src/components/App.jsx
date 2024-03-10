import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import SearchBox from "./SearchBox/SearchBox";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchContacts } from "../redux/operations";
import { useSelector } from "react-redux";
import { selectLoading, selectError } from "../redux/selectors";
import Loader from "./Loader/Loader";
import Error from "./Error/Error";

import css from "./App.module.css";

export default function App() {
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="container">
      <h1 className={css.header}>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
      {loading && <Loader />}
      {error && <Error />}
    </div>
  );
}
