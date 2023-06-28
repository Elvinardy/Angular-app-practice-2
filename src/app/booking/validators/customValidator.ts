import { AbstractControl } from "@angular/forms";

export class CustomValidator {
  // abstractcontrol is a base class for everything
  static validateName(control: AbstractControl) {
    const value = control.value as string;  // casting it as a string
    if(value.includes('testing')) {
      return {
        invalidName: true
      }
    }
    return null;
  }

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
