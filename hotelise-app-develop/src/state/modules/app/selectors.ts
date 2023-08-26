// import { createSelector } from 'reselect';
import { State } from "state/modules";

import { AppState } from "./types";

export const getAppState = (state: State): AppState => state.expenses;
