export interface AgreementCard {
  id: number;
  partnerName: string;
  holderName?: string;
  expirationDate: string;
  active: boolean;
  qrCodeHash: string;
}
