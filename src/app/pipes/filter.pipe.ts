import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], field: string, value: string): any[] {
    if (value) {
      console.log(value)

      return items.filter((item) => {
        const itemcitos = String(item[field]).toLowerCase();
        const valuecitos = value.toLowerCase();

        return itemcitos.indexOf(valuecitos) > -1;
      });

      
    }
    return items;
  }
}
