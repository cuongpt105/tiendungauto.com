import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { SimpleNumberPipe } from './simple-number.pipe';
import { FileSizePipe } from './file-size.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [SimpleNumberPipe, FileSizePipe],
    exports: [SimpleNumberPipe, FileSizePipe]
})

export class MainPipeModule{
    static  forRoot() {
      return {
          ngModule: MainPipeModule,
          providers: [],
      };
  }
}

