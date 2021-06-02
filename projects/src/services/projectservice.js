import pkg from 'uuid';
const { v4: uuid } = pkg;
import { createRequire } from "module"; 
const require = createRequire(import.meta.url);
const data = require("../data/data.json"); 

let projects = data;

export const getProjects = (req, res) => {
    
    res.send(projects);
}

export const createProject = (req, res) => {   
    const project = req.body;

    projects.push({id: uuid(),...project});
    
    console.log(`Project [${project.name}] added to the database.`);

    res.send("Project added successfully");
};

export const getProject = (req, res) => {
    var id= req.params.id;
    
    var project=projects.find((user)=>user.id===id);
    
    if(!project)
    {
        res.send("The project does not exist");
    }

    res.send(project);

};

export const deleteProject = (req, res) => {
      
    var id=req.params.id;
    
    console.log(`Project with id ${id} has been deleted`);
     
    projects.forEach((user,index)=>{
       if(req.params.id===user.id)
       {
           projects.splice(index,1);
       }
    });

    res.send(`Project with id ${id} has been deleted`);
};