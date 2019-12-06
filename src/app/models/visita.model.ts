export class Visita {

    constructor(
        public motivo_visitacion?: string,
        public aspec_academico?:number,
        public desc_academico?: string,
        public aspec_emocional?:number,
        public desc_emocional?: string,
        public aspec_salud?:number,
        public desc_salud?: string,
        public aspec_economico?:number,
        public desc_economico?: string,
        public aspec_espiritual?:number,
        public desc_espiritual?: string,
        public derivacion?: string,
        public student?: Object,
        public imgs?: Object, 
        public _id?: string
    ) { }

}