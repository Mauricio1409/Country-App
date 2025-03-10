import { ChangeDetectionStrategy, Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {
  placeholder = input('buscar');
  value = output<string>();

  initialValue = input<string>('')

  inputValue = linkedSignal<string>(() => this.initialValue())



  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeOut = setTimeout(() => {
      this.value.emit(value);

    }, 500);

    onCleanup(() => {
      clearTimeout(timeOut)
    })
  })
}
