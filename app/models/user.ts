import { School } from './school';

export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    SchoolId: number;
    School: School;
}
