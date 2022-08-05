import type {NavLayoutRootData, initObjType} from '../dataTypes/MyTypes'
import { faker } from '@faker-js/faker';

export default {
    getNewInitObjType: async () : Promise<initObjType> => {
      return {
        id: faker.datatype.uuid(),
        shortName: "new",
        textAdd: "this is new",
        inputSchema: [
          {
            id: faker.datatype.uuid(),
            type:'multiselect', 
            label: 'Have side effects on:', 
            value:"",
            selected: [

            ],
            selectable: [

            ]
          }
        ]
      }
    },
    navLayout: async () : Promise<NavLayoutRootData> =>  {
        return {
            navRightTopButtons:{
                inputInitObject: [
                    {
                        id:'dfffddhhh-0',
                        shortName: 'one',
                        textAdd: 'state 1',
                        inputSchema: [
                          {id: 'dsfasdgag-1', type:'text', label: 'Name', value:"state 1", hook:{ payload: 'textAdd', action:'meta'}},
                          {
                            id: 'dsfasdgag-2', 
                            type:'multiselect', 
                            label: 'Have side effects on:', 
                            value:"",
                            selected: [

                            ],
                            selectable: [
                              { id: 'dfffddhhh-1', text: 'this is text2'},
                            ]
                          }
                        ]
                    },
                    {
                        id:'dfffddhhh-1',
                        shortName: 'two',
                        textAdd: 'state 2',
                        inputSchema: [
                          {id: 'dsfasdgag-1', type:'text', label: 'label2', value:"state 2", hook:{ payload: 'textAdd', action:'meta'}},
                          {
                            id: 'dsfasdgag-2', 
                            type:'multiselect', 
                            label: 'Have side effects on:', 
                            value:"",
                            selected: [

                            ],
                            selectable: [
                              { id: 'dfffddhhh-0', text: 'this is text1'},
                            ]
                          },
                        ]
                    },
                ]
            }
        }
    } 
}