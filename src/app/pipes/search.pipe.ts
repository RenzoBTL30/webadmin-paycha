import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], field: string, value: string): any[] {
    if (value) {
      
      return items.filter((item) => {
        const itemcitos = String(item[field]).toLowerCase()
        const valuecitos = value.toLowerCase()
      
        return itemcitos.indexOf(valuecitos) > -1;
      });
    }
    return items;
  }
}
