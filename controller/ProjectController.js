const Project = require("../models/Project");
const User = require("../models/User");

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { projectName, projectManagerId, clientId } = req.body;
    // Check if project manager and client exist
    const projectManager = await User.findById(projectManagerId);
    const client = await User.findById(clientId);

    if (!projectManager || !client) {
      return res
        .status(404)
        .json({ message: "Project manager or client not found" });
    }

    const newProject = new Project({
      projectName,
      projectManager: projectManager._id,
      client: client._id,
      // Add other project fields as needed
    });
    const project = await newProject.save();
    if (project) {
      return res.status(200).send({ success: true, project: newProject });
    } else {
      res
        .status(400)
        .send({
          success: false,
          msg: "Project not created ,Something went wrong",
        });
    }
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ message: "Error creating project" });
  }
};

// Update an existing project
exports.updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { projectName } = req.body;

    const project = await Project.findByIdAndUpdate(
      projectId,
      { projectName },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project updated successfully", project });
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ message: "Error updating project" });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  const projectId = req.params.id;

  try {
    const deletedProject = await Project.findByIdAndRemove(projectId);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ message: "Error in deleting project" });
  }
};

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    let projects;

    // Check user role to determine which projects to fetch
    const userRole = req.user.role; // Assuming user role is stored in req.user

    if (userRole === "Client") {
      projects = await Project.find({ client: req.user._id }).populate(
        "projectManager client"
      );
    } else {
      projects = await Project.find().populate("projectManager client");
    }

    res.status(200).json({ projects });
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ message: "Error fetching projects" });
  }
};
