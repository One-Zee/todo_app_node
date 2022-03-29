const { 
    newTask,
    deleteTask,
    updateTask,
    moveTask
} = require('../db/query');

exports.createTask = async ( req, res ) => {
    try {        
        const { title } = req.body; //new task title
        const authorId = req.userId;
        const { id } = req.params;//categoryId
    
        const task = await newTask( { title } , authorId , id )
        if(task.acknowledged){
            if(task.modifiedCount === 0)
                res.status(404).json({ auth: true , msg:'Not found'});    
            else
                res.status(201).json({ auth: true , msg:'created' });
        }else
            res.status(400).json({ auth: true , msg:'bad request'});
    } catch (error) {
        res.status(500).json('Server error!!');
    }
}

exports.delTask = async ( req, res ) => {
    try {        
        const { id } = req.params;
        const authorId = req.userId;
    
        const task = await deleteTask( id, authorId );
        console.log('task: ', task);
        if(task.acknowledged){
            if(task.deletedCount === 0)
                res.status(404).json({ auth: true, msg:'Not found' });    
            else
                res.status(200).json({ auth: true, msg:'Deleted' });
        }else
            res.status(400).json({ auth: true, msg:'badrequest' });
    } catch (error) {
        res.status(500).json('Server error!!');
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
                res.status(404).json({ auth: true, msg:'Not found' });    
            }else{
                res.status(200).json({ auth: true, msg:'Edited' });
            }
        }else{
            res.status(400).json({ auth: true , msg:'bad request' });
        }
    } catch (error) {
        res.status(500).json('Server error!!');
    }
}

exports.moveToCategory = async ( req, res ) => {
    try {        
        const { from, to } = req.body; //categories
        const authorId = req.userId;
        const { id } = req.params;//taskId
        if(from !== to){
            const task = await moveTask( { from , to }, id, authorId )
            if(task)
                res.status(201).json({ auth: true, msg:'moved to new category' });
            else
                res.status(400).json({ auth: true, msg:'bad request' });
        }else{
            res.status(400).json({ auth: true, msg:'Cant move to same category' });
        }
        
    } catch (error) {
        res.status(500).json('Server error!!');
    }
}