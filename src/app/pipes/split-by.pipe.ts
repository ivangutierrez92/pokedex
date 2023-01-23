import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitBy'
})
export class SplitByPipe implements PipeTransform {

  transform(value: string, separator: string): string {
    return value.split(separator).join(" ");
  }

}
