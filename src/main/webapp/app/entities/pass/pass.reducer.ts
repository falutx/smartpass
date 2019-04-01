import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPass, defaultValue } from 'app/shared/model/pass.model';

export const ACTION_TYPES = {
  FETCH_PASS_LIST: 'pass/FETCH_PASS_LIST',
  FETCH_PASS: 'pass/FETCH_PASS',
  CREATE_PASS: 'pass/CREATE_PASS',
  UPDATE_PASS: 'pass/UPDATE_PASS',
  DELETE_PASS: 'pass/DELETE_PASS',
  RESET: 'pass/RESET',
  VALIDATE_PASS: 'pass/VALIDATE'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPass>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type PassState = Readonly<typeof initialState>;

// Reducer

export default (state: PassState = initialState, action): PassState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PASS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PASS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PASS):
    case REQUEST(ACTION_TYPES.UPDATE_PASS):
    case REQUEST(ACTION_TYPES.DELETE_PASS):
    case REQUEST(ACTION_TYPES.VALIDATE_PASS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PASS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PASS):
    case FAILURE(ACTION_TYPES.CREATE_PASS):
    case FAILURE(ACTION_TYPES.UPDATE_PASS):
    case FAILURE(ACTION_TYPES.DELETE_PASS):
    case FAILURE(ACTION_TYPES.VALIDATE_PASS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PASS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PASS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PASS):
    case SUCCESS(ACTION_TYPES.UPDATE_PASS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PASS):
    case SUCCESS(ACTION_TYPES.VALIDATE_PASS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/passes';

// Actions

export const getEntities: ICrudGetAllAction<IPass> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PASS_LIST,
  payload: axios.get<IPass>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IPass> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PASS,
    payload: axios.get<IPass>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPass> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PASS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPass> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PASS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPass> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PASS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const validateEntity: ICrudPutAction<IPass> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.VALIDATE_PASS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
