import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sommaAlgebricaFiltro',
  pure: false
})
export class SommaAlgebricaFiltroPipe implements PipeTransform {

	transform(n: number): string {
		if(n >= 0)
			return '+ ' + n;
		else
			return '- ' + Math.abs(n);
	  }

}
