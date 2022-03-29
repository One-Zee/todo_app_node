const res = require('express/lib/response');
const Category = require('./models/categoriesModel');
const Task = require('./models/task_model');

// category queries

const newCategory = async ( data ) =>{
    return await Category.create( data )
  };

const getCategoriesWithPopulate = async( authorId ) => {
    return await Category.find({ authorId }).populate("tasks");
}

const deleteCategory = async ( _id, authorId ) => {
    return await Category.deleteOne({ _id, authorId })
}

const updateCategory = async ( _id, authorId, update) => {
    return await Category.updateOne({ _id, authorId }, update )
}

// task queries


const newTask = async (data , authorId , categoryId,) => {
  const docTask = await Task.create(data);
  return await Category.updateOne(
    { _id:categoryId , authorId },
    { $push: { tasks: docTask._id } },
    { new: true, useFindAndModify: false }
  );
};

const deleteTask = async ( _id, authorId ) => {
    return await Task.deleteOne({ _id, authorId })
}

const updateTask = async ( _id, authorId, update) => {
    return await Task.updateOne({ _id, authorId }, update )
}

const moveTask = async (categories, _id, authorId) => {
  const { to, from } = categories
  let catPull = {};
  const catPush = await Category.updateOne(
    { _id:to, authorId },
    { $push: { tasks: _id } }
  ) 
//  console.log('catPush', catPush);
  if(catPush.modifiedCount){
    console.log('here');
    catPull = await Category.updateOne(
      { _id:from, authorId },
      { $pull: { tasks: { $in:[ _id ] }} });
//    console.log('catPull', catPull);
    return catPull.modifiedCount ? true : false
  }else{
    return false
  }
}

const checksTask = async (data, authorId) =>{
  const { _id, from} = data;
    const response = await Category.findOne({ _id: from,authorId})
    console.log(response);
    if(response){
      const filt = await response.tasks.filter(task =>  task == _id );
    //  console.log('res: ' , filt);
      return filt.length ? true : false;
    }else
      return false
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
    updateTask,
    moveTask,
    checksTask
}