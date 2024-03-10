import { createSelector } from "@reduxjs/toolkit";

export function selectContacts(state) {
  return state.contacts.items;
}

export function selectLoading(state) {
  return state.contacts.loading;
}

export function selectError(state) {
  return state.contacts.error;
}

export function selectNameFilter(state) {
  return state.filters.name;
}

export const selectFilteredContacts = createSelector(
  [selectNameFilter, selectContacts],
  (filter, contacts) => {
    return contacts.filter((contact) => {
      return contact.name.toUpperCase().includes(filter.toUpperCase());
    });
  }
);
