const mongodb =  require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll= async( req, res) =>{
    //#swagger.tags=["Users"]
    const result = await mongodb.getDatabase().db().collection("courses").find();
    result.toArray().then((courses) =>{
        res.setHeader("Content-type","application/json");
        res.status(200).json(courses);
    });

};

const getSingle = async( req, res) =>{
    //#swagger.tags=["Users"]
    const courseId =new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("courses").find({_id: courseId});
    result.toArray().then((courses) =>{
        res.setHeader("Content-type","application/json");
        res.status(200).json(courses);
    });
};

const createCourse = async (req, res) =>{
    //#swagger.tags=["Users"]
    const course = {
        name: req.body.name,
        term: req.body.term,
        credits: req.body.credits
    };
    const response = await mongodb.getDatabase().db().collection("courses").insertOne(course);
    if (response.acknowledged) {
        res.status(204).send();
    }else {
        res.status(500).json(response.error || "Some error ocurred while updating the course.");
    }
};

const updateCourse = async (req, res) =>{
    //#swagger.tags=["Users"]
    const courseId =new ObjectId(req.params.id);
    const course = {
        name: req.body.name,
        term: req.body.term,
        credits: req.body.credits
    };
    const response = await mongodb.getDatabase().db().collection("courses").replaceOne({_id: courseId}, course);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }else {
        res.status(500).json(response.error || "Some error ocurred while updating the course.");
    }
};

const deleteCourse = async (req, res) =>{
    //#swagger.tags=["Users"]
    const courseId =new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("courses").deleteOne({_id: courseId});
    if (response.deleteCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error ocurred while updating the course.");
    }
};

module.exports = {
    getAll,getSingle,createCourse,updateCourse,deleteCourse
}