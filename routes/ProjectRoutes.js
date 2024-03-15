const express = require('express');
const router = express.Router();
const projectController = require('../controller/ProjectController');
const authMiddleware = require('../middleware/AuthMiddleware');

// POST /projects (Create a new project)
router.post('/', authMiddleware.checkAuthorization(['SuperAdmin', 'Admin']), projectController.createProject);

// PUT /projects/:id (Update an existing project)
router.put('/:id', authMiddleware.checkAuthorization(['SuperAdmin', 'Admin']), projectController.updateProject);

// DELETE /projects/:id (Delete a project)
router.delete('/:id', authMiddleware.checkAuthorization(['SuperAdmin']), projectController.deleteProject);

// GET /projects (Get all projects)
router.get('/', authMiddleware.checkAuthorization(['SuperAdmin', 'Admin', 'Client']), projectController.getProjects);

module.exports = router;
