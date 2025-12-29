import { Address } from './Address.model';

export interface Partner {
  id: number;
  name: string;
  phone: string;
  isHolder: boolean;
  holderName?: string;
  address?: Address;
}
