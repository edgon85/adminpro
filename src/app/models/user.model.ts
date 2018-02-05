
export class User {

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public id?: string,
        public a_paterno?: string,
        public a_materno?: string,
        public img?: string,
        public genero?: boolean,
        public fecha_nacimiento?: string,
        public is_active: boolean = false,
        public is_staff: boolean = false,
    ) { }

}
