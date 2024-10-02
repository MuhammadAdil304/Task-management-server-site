const TaskController = require('../controllers/taskController');
const { authenticateToken } = require('./authRoute');
const router = require('express').Router();

router.post('/create-task' , authenticateToken, TaskController.createTask)
router.get('/get-all-tasks' , authenticateToken, TaskController.getAllTasks)
router.delete('/delete-task/:id' , authenticateToken, TaskController.deleteTask)
router.put('/update-task/:id' , authenticateToken, TaskController.updateTask)
router.put('/update-important-task/:id' , authenticateToken, TaskController.updateImportantTask)
router.put('/update-complete-task/:id' , authenticateToken, TaskController.updateCompleteTask)
router.get('/get-important-tasks' , authenticateToken, TaskController.getImportantTasks)
router.get('/get-completed-tasks' , authenticateToken, TaskController.getCompletedTasks)
router.get('/get-incompleted-tasks' , authenticateToken, TaskController.getIncompletedTasks)

module.exports = router