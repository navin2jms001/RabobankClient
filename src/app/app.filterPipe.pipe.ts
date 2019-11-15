import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'filterPipe' })
export class FilterPipe implements PipeTransform {
  transform(records: any, searchText: any): any {
    console.log("records",records);
    if(searchText == null) return records;
    return records.filter(e => e[2].includes(searchText));
  }
}