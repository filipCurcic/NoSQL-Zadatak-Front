import { Permission } from './permission';

export interface Korisnik {
    id: string;
    ime: string;
    prezime: string;
    email: string;
    lozinka: string;
    datumRodjenja: Date;
    permission: Permission;
}