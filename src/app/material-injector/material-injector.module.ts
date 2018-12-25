import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatFormFieldModule, MatInputModule
  ],
  exports: [MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatFormFieldModule, MatInputModule],
  declarations: []
})
export class MaterialInjectorModule { }
