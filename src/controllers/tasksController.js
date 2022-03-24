const { 
    newTask,
    deleteTask,
    updateTask
} = require('../db/query');

exports.createTask = async ( req, res ) => {
    try {        
        const { title } = req.body; //new task title
        const authorId = req.userId;
        const { id } = req.params;//categoryId
    
        const task = await newTask( { title } , authorId , id )
        console.log('category: ', task);
        res.status(201).json({ auth: true });
    } catch (error) {
        res.status(500).json('Server error!!');
        console.log({status:'fail',error});
    }
}

exports.delTask = async ( req, res ) => {
    try {        
        const { id } = req.params;
        const authorId = req.userId;
    
        const task = await deleteTask( id, authorId );
        console.log('task: ', task);
        if(task.acknowledged){
            if(task.deletedCount === 0){
                res.status(404).json({ auth: true });    
            }else{
                res.status(200).json({ auth: true });
            }
        }else{
            res.status(400).json({ auth: true });
        }
    } catch (error) {
        res.status(500).json('Server error!!');
        console.log({status:'fail',error});
    }
}

exports.editTask = async ( req, res ) => {
    try {        
        const { id } = req.params;
        const authorId = req.userId;
        const { title , completed } = req.body;
    
        const task = await updateTask( id, authorId , { title , completed } );
        console.log(task);
        if(task.acknowledged){
            
            if(task.modifiedCount === 0){
                res.status(404).json({ auth: true });    
            }else{
                res.status(200).json({ auth: true });
            }

        }else{
            res.status(400).json({ auth: true });
        }
    } catch (error) {
        res.status(500).json('Server error!!');
        console.log({status:'fail',error});
    }
}