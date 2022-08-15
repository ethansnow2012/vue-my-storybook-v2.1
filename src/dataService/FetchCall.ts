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
                              //this should be autofilled
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
                              //this should be autofilled
                            ]
                          },
                        ]
                    },
                    {
                      id:'dfffddhhh-2',
                      shortName: 'three',
                      textAdd: 'state 3',
                      inputSchema: [
                        {id: 'dsfasdgag-2-1', type:'text', label: 'label2', value:"state 3", hook:{ payload: 'textAdd', action:'meta'}},
                        {
                          id: 'dsfasdgag-2-2', 
                          type:'multiselect', 
                          label: 'Have side effects on:', 
                          value:"",
                          selected: [

                          ],
                          selectable: [
                            //this should be autofilled
                          ]
                        },
                      ]
                    },
                    {
                      id:'dfffddhhh-3',
                      shortName: 'four',
                      textAdd: 'state 4',
                      inputSchema: [
                        {id: 'dsfasdgag-3-1', type:'text', label: 'label2', value:"state 4", hook:{ payload: 'textAdd', action:'meta'}},
                        {
                          id: 'dsfasdgag-3-2', 
                          type:'multiselect', 
                          label: 'Have side effects on:', 
                          value:"",
                          selected: [

                          ],
                          selectable: [
                            //this should be autofilled
                          ]
                        },
                      ]
                    },
                ]
            }
        }
    } 
}