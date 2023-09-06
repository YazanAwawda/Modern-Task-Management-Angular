import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <a [routerLink]="['/ui-components/project-list']" >
        <img style="width : 160px; height :160px   ; object-fit: fill ;"
             src="./assets/images/logos/logoExpertsNew.png"
             class="align-middle ms-4"
          alt="logo"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
