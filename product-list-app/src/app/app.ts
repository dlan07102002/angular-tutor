import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderLayoutComponent } from './shared/header-layout/header-layout.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderLayoutComponent, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Text
  protected title = {
    name: 'Test',
    old: 2024,
  };

  // Properties
  isDisable = false;

  // Attributes
  contentImage = 'Duclan Welcome';

  showAlert() {
    alert(this.contentImage);
  }

  nameBtn = 'Click me';

  clickMessage = '';

  bindingMessage = '';

  handleClickMe(): void {
    if (this.clickMessage) {
      this.clickMessage = '';
    } else this.clickMessage = 'Click me Done';
  }

  handleChangeValue(): void {
    console.log('Received event');
  }
}
