import { AddressRequest } from "./Address.model"

export interface PartnerCompany {
    id: number,
    name: string,
    cnpj: string,
    maxDiscount: number
    address: AddressRequest
}
