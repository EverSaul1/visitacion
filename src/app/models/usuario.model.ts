export class Usuario {

    constructor(
        public username?:string,
        public password?: string,
        public email?: string,
        public name?: string,
        public estado?: boolean,
        public role?: string,
        public avatar?: string,
        public _id?: string
    ) { }

}