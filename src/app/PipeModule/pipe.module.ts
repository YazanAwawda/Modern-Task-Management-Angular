import { NgModule }      from '@angular/core';
import * as EnumPipe     from '../EnumPipe/enum.pipe';

@NgModule({
  imports:        [],

  declarations:   [EnumPipe.TaskTypePipe ,
    EnumPipe.TaskPriorityPipe
    , EnumPipe.TaskStatusPipe
    , EnumPipe.ProjectStatusPipe ],

  exports:        [EnumPipe.TaskTypePipe ,
    EnumPipe.TaskPriorityPipe ,
    EnumPipe.TaskStatusPipe ,
    EnumPipe.ProjectStatusPipe],
})

export class PipeModule {

  static forRoot() {
    return {
      ngModule: PipeModule,
      providers: [],
    };
  }
}
