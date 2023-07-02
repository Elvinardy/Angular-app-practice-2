import { AbstractControl } from "@angular/forms";

export class CustomValidator {
  // abstractcontrol is a base class for everything
  // validate if a particluar string is included in the user input
  static validateName(control: AbstractControl) {
    const value = control.value as string;  // casting it as a string
    if(value.includes('testing')) {
      return {
        invalidName: true
      }
    }
    return null;
  }
  // validate if special characters is keyed in user input
  static validateSpecialChar(char: string) {
    return (control: AbstractControl) => {
      const value = control.value as string;  // casting it as a string
      if(value.includes(char)) {
        return {
          invalidSpecialChar: true
        }
      }
      return null;
    }
  }
}
