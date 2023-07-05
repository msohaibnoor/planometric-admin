import { createSelector } from 'reselect'

const selectLoginDomain = (state) => state["auth"];

export const makeSelectAuthToken = () =>
  createSelector(selectLoginDomain, (globalState) => globalState.token);
  