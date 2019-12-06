import { Apoderado } from './apoderado.model';
import { Iglesia } from './iglesia.model';
export class Estudiante {

    constructor(
        public email?: string,
        public name?: string,
        public dni?: string,
        public cell_phone?: string,
        public origin?: string,
        public address?: string,
        public latitude?: number,
        public longitude?: number,
        public sabbatical_school?: string,
        public baptized?: boolean,
        public filiacion_religoso?: string,
        public church?: any,
        public ciclo?: string,
        public group?: string,
        public school?: string,
        public father_apo?: Apoderado,
        public economic_responsible?: Apoderado,
        public user?: string,
        public _id?: string
    ) { 
        
    }

}