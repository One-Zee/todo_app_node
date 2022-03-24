const Category = require('./models/categoriesModel');
const Task = require('./models/task_model');

// category queries
const newCategory = async ( data ) =>{
    return await Category.create( data )
  };

const getCategoriesWithPopulate = ( authorId ) => {
    return Category.find({ authorId }).populate("tasks");
}

const deleteCategory = ( _id, authorId ) => {
    return Category.deleteOne({ _id, authorId })
}

const updateCategory = ( _id, authorId, update) => {
    return Category.updateOne({ _id, authorId }, update )
}

// task queries


const newTask = (data , authorId , categoryId,) => {
  return Task.create(data).then(docTask => {
    return Category.updateOne(
        { _id:categoryId , authorId },
      { $push: { tasks: docTask._id } },
      { new: true, useFindAndModify: false }
    );
  });
};

const deleteTask = ( _id, authorId ) => {
    return Task.deleteOne({ _id, authorId })
}

const updateTask = ( _id, authorId, update) => {
    return Task.updateOne({ _id, authorId }, update )
}



module.exports = {
    // Category
    newCategory,
    getCategoriesWithPopulate,
    deleteCategory,
    updateCategory,
    // Task
    newTask,
    deleteTask,
    updateTask
}