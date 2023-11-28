import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter_categoria',
})
export class FilterCategoriaPipe implements PipeTransform {
  transform(items: any[], field: string, value: string): any[] {
    if (value) {

      if (value == "Producto") {
        return items;
      }

      return items.filter((item) => {
        const itemcitos = String(item[field]).toLowerCase();
        const valuecitos = value.toLowerCase();

        return itemcitos.indexOf(valuecitos) > -1;
      });

      
    }
    return items;
  }
}