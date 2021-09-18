import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderPipe implements PipeTransform {

  transform(value: any[], Name: string): any[] {
    if (Name)
      return value.sort((a: any, b: any) => a[Name].localeCompare(b[Name]));
    else
      return value;
  }

}
