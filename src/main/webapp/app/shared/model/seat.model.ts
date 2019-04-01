import { IZone } from 'app/shared/model/zone.model';

export interface ISeat {
  id?: number;
  row?: number;
  seat?: number;
  seatId?: string;
  zone?: IZone;
}

export const defaultValue: Readonly<ISeat> = {};
