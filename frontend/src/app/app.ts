import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiMenuComponent } from './ui/ui-menu/ui-menu.component';

@Component({
  selector: 'app-root',
  imports: [UiMenuComponent, RouterOutlet, UiMenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  protected readonly appTitle = signal('Rick & Morty Admin');
protected readonly title = signal('frontend');
}
