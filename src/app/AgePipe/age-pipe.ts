import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
})

export class AgePipe implements PipeTransform {

  /**
   * Format given date/dob to the age.
   * @param date - Given date to be converted to the dob and age
   * @returns - age string
   */
  transform(dob: string | Date): number {

    const today: Date = new Date();
    const birthDate: Date = new Date(dob);

    let age: number = today.getFullYear() - birthDate.getFullYear();
    const monthDiff: number = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }
}
