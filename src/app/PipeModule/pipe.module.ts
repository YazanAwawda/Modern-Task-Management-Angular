import { NgModule }      from '@angular/core';
import * as EnumPipe     from '../EnumPipe/enum.pipe';
import {ConverterPipe} from "../TreeNodePipe/node-pipe";
import {ValueArrayPipe} from "../ValueArrayPipe/value.pipe";
import {AgePipe} from "../AgePipe/age-pipe";

@NgModule({
  imports:        [],

  declarations:[
     EnumPipe.TaskTypePipe ,
     EnumPipe.TaskPriorityPipe
    ,EnumPipe.TaskStatusPipe
    ,EnumPipe.ProjectStatusPipe,
     ConverterPipe , ValueArrayPipe , AgePipe],

  exports:[
    EnumPipe.TaskTypePipe ,
    EnumPipe.TaskPriorityPipe ,
    EnumPipe.TaskStatusPipe,
    ConverterPipe , ValueArrayPipe , AgePipe],
})

export class PipeModule {

  static forRoot() {
    return {
      ngModule: PipeModule,
      providers: [],
    };
  }
}
