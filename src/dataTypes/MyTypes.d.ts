export interface inputSchemaItem$SelectedTag  {
    id: string,
    text: string
}
export interface inputSchemaItem  {
    id:string,
    type: 'text'|'multiselect',
    label: string,
    value: string,
    selected?: inputSchemaItem$SelectedTag []
    selectable?: inputSchemaItem$SelectedTag [],
    hook?: { payload: string, action:string}
}
export interface initObjType  {
    id:string,
    shortName?: string
    textAdd: string,
    inputSchema: inputSchemaItem []
}
export interface NavLayoutRootData  {
    navRightTopButtons: {
        inputInitObject: initObjType[]
    }
}
export type NodeA = {
    "name": string,
    "color"?: string,
    "children"?: NodeA[],
    "value"?: number
}