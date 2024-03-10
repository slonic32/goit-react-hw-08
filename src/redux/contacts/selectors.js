import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "../filter/selectors";

export function selectContacts(state) {
  return state.contacts.items;
}

export function selectContactsLoading(state) {
  return state.contacts.loading;
}

export function selectContactsError(state) {
  return state.contacts.error;
}

export const selectFilteredContacts = createSelector(
  [selectNameFilter, selectContacts],
  (filter, contacts) => {
    return contacts.filter((contact) => {
      return contact.name.toUpperCase().includes(filter.toUpperCase());
    });
  }
);
