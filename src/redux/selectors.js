import { selectAuthError, selectAuthLoading } from "./auth/selectors";
import {
  selectContactsError,
  selectContactsLoading,
} from "./contacts/selectors";

export function selectLoading(state) {
  if (selectContactsLoading(state)) {
    return selectContactsLoading(state);
  } else {
    return selectAuthLoading(state);
  }
}

export function selectError(state) {
  if (selectContactsError(state)) {
    return selectContactsError(state);
  } else {
    return selectAuthError(state);
  }
}
