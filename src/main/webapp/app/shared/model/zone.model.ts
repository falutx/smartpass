import { ISeat } from 'app/shared/model/seat.model';

export interface IZone {
  id?: number;
  name?: string;
  price?: number;
  seats?: ISeat[];
}

export const defaultValue: Readonly<IZone> = {};
