import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'GetType'})
export class GetTypePipe implements PipeTransform {
  transform(value, args: string[]): any {
    const keys = [];
    // tslint:disable-next-line: forin
    for (const key in value) {
      keys.push(key);
    }
    const test =  keys.slice(0, keys.length);
    return keys.slice(0, keys.length);
  }
}
