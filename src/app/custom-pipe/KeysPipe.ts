import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    const keys = [];
    // tslint:disable-next-line: forin
    for (const key in value) {
      keys.push(key);
    }

    // Separate keys for space only for args = 0
    if (args[0] == '0') {
      for (let index = 0; index < keys.length; index++) {
            keys[index] =  keys[index].replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
          }
    }

    return keys.slice(0, keys.length);
  }
}
