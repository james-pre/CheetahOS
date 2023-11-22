import {AbstractControl, ValidatorFn} from '@angular/forms';

export class CustomValidator{

    static invalidCharacters(): ValidatorFn {
        return(c: AbstractControl): {[key: string]: boolean } | null =>{
            const invalidChars:string[] = ['#','%','&','{','}','|','\\','<','>','*','?','/','','$','!',"'",'"',':','@','+','`','=']    
            if(!invalidChars.includes(c.value)){
                return {'value': true}
            }
            return null;
        }
    }
}