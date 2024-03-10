export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectUser = (state) => state.auth.user;

export const selectIsRefreshing = (state) => state.auth.isRefreshing;

export function selectAuthLoading(state) {
  return state.auth.loading;
}

export function selectAuthError(state) {
  return state.auth.error;
}
