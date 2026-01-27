import { Component, Input } from '@angular/core'
import { NgFor, NgIf } from '@angular/common'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { GeneratedMenu, generatedMenu } from '../../../generate-ui/menu.gen'

@Component({
  selector: 'ui-menu',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, RouterLinkActive],
  templateUrl: './ui-menu.component.html',
  styleUrls: ['./ui-menu.component.scss']
})
export class UiMenuComponent {
  @Input() menu: GeneratedMenu = generatedMenu
  @Input() title = 'Generate UI'
}
