import { v4 as uuid } from 'uuid';

let projects = [];

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
    res.send(project);

};

export const deleteProject = (req, res) => { 
    console.log(`Project with id ${req.params.id} has been deleted`);
    
    projects = projects.filter((user) => user.id !== req.params.id);

    res.send("Project deleted successfully");
};