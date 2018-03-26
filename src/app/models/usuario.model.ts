
export class Usuario {
    constructor (
        public username: string,
        public email: string,
        public password: string,
        public password2: string,
        public img?: string,
        public role?: string,
        public _id?: string
    ) {}
}
