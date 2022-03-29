const { 
    newCategory, 
    getCategoriesWithPopulate, 
    deleteCategory, 
    updateCategory 
} = require('../db/query');

const mongoose = require('mongoose')

exports.createCategory = async ( req, res ) => {
    try {        
        const { title } = req.body;
        const authorId = req.userId;
    
        const category = await newCategory({ title , authorId })
        res.status(201).json({ auth: true , data:category });
    } catch (error) {
        res.status(500).json('Server error!!');
    }
}

exports.getAllCategories = async ( req, res ) => {
    try {        
        const authorId = req.userId;
    
        const category = await getCategoriesWithPopulate(authorId)
        res.status(200).json({ auth: true , data:category });
    } catch (error) {
        res.status(500).json('Server error!!');
    }
}

exports.delCategory = async ( req, res ) => {
    try {        
        const { id } = req.params;
        const authorId = req.userId;
    
        const category = await deleteCategory( id, authorId );
        //console.log('category: ', category);
        if(category.acknowledged){
            if(category.deletedCount === 0)
                res.status(404).json({ auth: true , msg:'Not found'}); //false   
            else
                res.status(200).json({ auth: true, msg:'Deleted'  });// true
        }else
            res.status(400).json({ auth: true, msg:'bad request' }); // false
    } catch (error) {
        if (error instanceof mongoose.CastError) {
            res.status(400).json({ auth:true ,msg:'Not an objectId'});
        }else{
            res.status(500).json('Server error!!');
        }
    }
}

exports.editCategory = async ( req, res ) => {
    try {        
        const { id } = req.params;
        const authorId = req.userId;
        const { title } = req.body;
    
        const category = await updateCategory( id, authorId , { title } );
        if(category.acknowledged){
            if(category.modifiedCount === 0)
                res.status(404).json({ auth: true, msg:'Not found' });    
            else
                res.status(200).json({ auth: true , msg:'Edited' });
        }else
            res.status(400).json({ auth: true, msg:'bad requeest' });
    } catch (error) {
        res.status(500).json('Server error!!');
    }
}