import { AddressRequest } from './Address.model';

export interface PartnerCompanyRequest {
  name: string;
  cnpj: string;
  phone: string;
  email: string;
  maxDiscount: number;
  address: AddressRequest;
}
