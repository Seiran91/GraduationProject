//Custom validation function for testing purpose
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function customEmailValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;
        console.log("Value is: " + value);
        if (!value) {
            return null;
        }
        const emailReg = /^([a-zA-Z]+([0-9.\-_]*[a-z0-9]+)*@{1}[a-z]+\.{1}[a-z]+)+$/;
        const validEmail = emailReg.test(value);
        console.log("Email is: " + validEmail);
        return validEmail ? {validEmail} : null;
    }
}