export const initialData= {
    tasks : {
        'task-1':{id:'task-1',content:'take out the trash'},
        'task-2':{id:'task-2',content:'do laundry'},
        'task-3':{id:'task-3',content:'prepare dinner'},
        'task-4':{id:'task-4',content:'pay taxes'},
        'task-5':{id:'task-5',content:'wash the dishes'},
    },
    columns :{
        'column-1':{
            id : 'column-1',
            title : 'To do',
            taskIds : ['task-4','task-5']
        },
        'column-2':{
            id : 'column-2',
            title : 'In progress',
            taskIds : ['task-3']
        },
        'column-3':{
            id : 'column-3',
            title : 'Completed',
            taskIds : ['task-1','task-2']
        }
    },
    columnOrder : ['column-1','column-2','column-3']
}

