import {Pipe, PipeTransform} from "@angular/core";

@Pipe({ name: 'Converter' })
export class ConverterPipe implements PipeTransform {
  transform(array: any[], id: string = "id", parentId: string = "parent", rootValue: any = "0"): any[] {
    return this.filterNodes(array, id, parentId, rootValue);
  }
  filterNodes(array: any[], id: string, parentId: string, parentValue: any): any[] {
    return array.filter((node) => {
      return node[parentId] === parentValue;
    }).map((node) => {
      node["items"] = this.filterNodes(array, id, parentId, node[id]);
      return node;
    });
  }
}

