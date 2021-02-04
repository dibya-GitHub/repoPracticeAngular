import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sort",
})
export class DataTableSortPipe implements PipeTransform {
  transform(givenArr: any[], sortBy: string, orderBy: string) {
    if (sortBy) {
      // const def = colDef.find(def => def.field === sortBy);
      if (givenArr && givenArr.length > 0) {
        const isNum = typeof givenArr[0][sortBy];
        if (isNum === "number") {
          return this.numberSort(givenArr, sortBy, orderBy);
        } else {
          return this.stringSort(givenArr, sortBy, orderBy);
        }
      } else {
        return givenArr;
      }
    } else {
      return givenArr;
    }
  }

  numberSort(givenArr: any[], sortBy: string, orderBy: string) {
    if (!orderBy || orderBy === "Asc") {
      return givenArr.sort((a, b) => a[sortBy] - b[sortBy]);
    } else {
      return givenArr.sort((a, b) => b[sortBy] - a[sortBy]);
    }
  }

  stringSort(givenArr: any[], sortBy: string, orderBy: string) {
    if (!orderBy || orderBy === "Asc") {
      return givenArr.sort((a, b) => {
        if (a[sortBy].toString() > b[sortBy].toString()) {
          return -1;
        } else {
          return 1;
        }
      });
    } else {
      return givenArr.sort((a, b) => {
        if (a[sortBy].toString() < b[sortBy].toString()) {
          return -1;
        } else {
          return 1;
        }
      });
    }
  }
}
