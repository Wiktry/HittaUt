import { Dispatch, useReducer } from "react";
import { CredentialsActionType } from "../constants/Enums";
import { ICredentials } from "../constants/Interfaces";

interface CredentialsAction {
  type: CredentialsActionType,
  payload: string
}

const reducer = (state: ICredentials, action: CredentialsAction) => {
  const { type, payload } = action;
  switch (type) {
    case CredentialsActionType.email:
      return {
        ...state,
        username: payload
      };
    case CredentialsActionType.password:
      return {
        ...state,
        password: payload
      }
  } 
}

export const credentialsReducer = (): [ICredentials, Dispatch<CredentialsAction>] => {
  const [credentials, dispatch] = useReducer(reducer, { username: '', password: ''});

  return [credentials, dispatch];
}