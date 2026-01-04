import { Address } from './Address.model';

export interface Partner {
  id: number;
  name: string;
  phone: string;
  cpf: string;
  holderId: number;
  isHolder: boolean;
  holderName?: string;
  address?: Address;
}
