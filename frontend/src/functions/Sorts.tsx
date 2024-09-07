import { Sorts } from "../Types/Types"

export const SortsPorps = (sortedInfo:Sorts,currentColumn:string) => {
    if(sortedInfo.columnKey != null || undefined){
        return {
            sortOrder:  sortedInfo.columnKey === currentColumn ? sortedInfo.order : null,
        }
    }else{
        return {}
    }
}
