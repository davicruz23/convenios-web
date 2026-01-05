import { AddressRequest } from "./Address.model";

export interface PartnerRequest {
  name: string;
  cpf: string;
  phone: string;
  isHolder: boolean;
  holderId?: number;
  address?: AddressRequest
}