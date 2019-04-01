import { ISeat } from 'app/shared/model/seat.model';

export const enum Status {
  VALID = 'VALID',
  CANCELLED = 'CANCELLED',
  PENDING = 'PENDING'
}

export interface IPass {
  id?: number;
  season?: string;
  status?: Status;
  owner?: string;
  passId?: number;
  seat?: ISeat;
}

export const defaultValue: Readonly<IPass> = {};
