import { useId } from "react";
import css from "./SearchBox.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectNameFilter } from "../../redux/selectors";
import { changeFilter } from "../../redux/filtersSlice";

export default function SearchBox() {
  const id = useId();
  const filter = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  function handleInput(event) {
    dispatch(changeFilter(event.target.value));
  }

  return (
    <div className={css.searchBox}>
      <label htmlFor={id}>Find contacts by name</label>

      <input
        type="text"
        id={id}
        name={filter}
        onInput={handleInput}
        className={css.filter}
      />
    </div>
  );
}
