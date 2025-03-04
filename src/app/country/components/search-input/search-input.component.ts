import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {
  placeholder = input('buscar');
  value = output<string>();
}
