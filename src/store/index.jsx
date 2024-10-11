import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";

import { reducer as userDetailReducer } from "./userReducer";
import { reducer as userSession } from "./sessionReducer";
import { reducer as teamMember } from "./teamReducer";
import {
  reducer as questionsList,
  updateQuestionOrder,
} from "./questionReducer";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  stateReconciler: autoMergeLevel2,
  blacklist: ["appConfig"],
};

const rootReducer = combineReducers({
  user: userDetailReducer,
  session: userSession,
  team: teamMember,
  questions: questionsList,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  devTools:
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(),
});
export const persistor = persistStore(store);
export default store;
