export interface PartnerResponse {
  id: number;
  name: string;
  cpf: string;
  phone: string;
  isHolder: boolean;
  holderId: number;
  holderName?: string;
}