const { 
    newCategory, 
    getCategoriesWithPopulate, 
    deleteCategory, 
    updateCategory 
} = require('../db/query');

exports.createCategory = async ( req, res ) => {
    try {        
        const { title } = req.body;
        const authorId = req.userId;
    
        const category = await newCategory({ title , authorId })
        //console.log('category: ', category);
        res.status(201).json({ auth: true , data:category });
    } catch (error) {
        res.status(500).json('Server error!!');
        console.log({status:'fail',error});
    }
}

exports.getAllCategories = async ( req, res ) => {
    try {        
        const authorId = req.userId;
    
        const category = await getCategoriesWithPopulate(authorId)
        res.status(201).json({ auth: true , data:category });
    } catch (error) {
        res.status(500).json('Server error!!');
        console.log({status:'fail',error});
    }
}

exports.delCategory = async ( req, res ) => {
    try {        
        const { id } = req.params;
        const authorId = req.userId;
    
        const category = await deleteCategory( id, authorId );
        //console.log('category: ', category);
        if(category.acknowledged){
            if(category.deletedCount === 0){
                res.status(404).json({ auth: true }); //false   
            }else{
                res.status(200).json({ auth: true  });// true
            }
        }else{
            res.status(400).json({ auth: true }); // false
        }
    } catch (error) {
        res.status(500).json('Server error!!');
        console.log({status:'fail',error});
    }
}

exports.editCategory = async ( req, res ) => {
    try {        
        const { id } = req.params;
        const authorId = req.userId;
        const { title } = req.body;
    
        const category = await updateCategory( id, authorId , { title } );
        if(category.acknowledged){
            console.log(category);
            
            if(category.modifiedCount === 0){
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