
export class Usuario {
    constructor (
        public username: string,
        public email: string,
        public password: string,
        public password2: string,
        public first_name?: string,
        public last_name?: string,
        public img?: string,
        public role?: string,
        public id?: string
    ) {}
}
