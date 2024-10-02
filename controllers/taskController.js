const Response = require("../heplers/helper")
const Task = require('../models/task')
const User = require('../models/user')

const TaskController = {
    createTask: async (req, res) => {
        try {
            const { title, desc } = req.body
            const { id } = req.headers
            const obj = { title, desc }
            const errArray = []
            if (!obj.title || !obj.desc) {
                errArray.push('Title and Description are required')
                return Response.sendError(res, 400, 'Title and Description are required', errArray)
            }
            const task = new Task(obj)
            await task.save()
            const taskId = task._id
            await User.findByIdAndUpdate(id, { $push: { tasks: taskId } })
            return Response.sendMessage(res, 200, 'Task saved successfully', task)
        } catch (error) {

        }
    },
    getAllTasks: async (req, res) => {
        try {
            const { id } = req.headers
            const userData = await User.findById(id).populate({ path: 'tasks', options: { sort: { createdAt: -1 } } })
            Response.sendMessage(res, 200, '', userData)
        } catch (error) {
            return Response.sendError(res, 500, 'Some error occured', error.message)
        }
    },
    deleteTask: async (req, res) => {
        try {
            const { id } = req.params
            const userId = req.headers.id
            await Task.findByIdAndDelete(id)
            await User.findByIdAndUpdate(userId, { $pull: { tasks: id } })
            return Response.sendMessage(res, 200, 'Task deleted successfully', null)
        } catch (error) {
            return Response.sendError(res, 500, 'Some error occured', error.message)
        }
    },
    updateTask: async (req, res) => {
        try {
            const { id } = req.params
            const { title, desc } = req.body
            const updatedTask = await Task.findByIdAndUpdate(id, { title: title, desc: desc },{new:true})
            return Response.sendMessage(res, 200, 'Task updated successfully', updatedTask)

        } catch (error) {
            return Response.sendError(res, 500, 'Some error occured', error.message)
        }
    },
    updateImportantTask: async (req, res) => {
        try {
            const { id } = req.params
            const taskData = await Task.findById(id)
            const importantTask = taskData.important
            const updatedTaskStatus = await Task.findByIdAndUpdate(id, { important: !importantTask })
            return Response.sendMessage(res, 200, 'Task updated successfully', updatedTaskStatus)

        } catch (error) {
            return Response.sendError(res, 500, 'Some error occured', error.message)
        }
    },
    updateCompleteTask: async (req, res) => {
        try {
            const { id } = req.params
            const taskData = await Task.findById(id)
            const completedTask = taskData.complete
            const updatedTaskStatus = await Task.findByIdAndUpdate(id, { complete: !completedTask })
            return Response.sendMessage(res, 200, 'Task updated successfully', updatedTaskStatus)

        } catch (error) {
            return Response.sendError(res, 500, 'Some error occured', error.message)
        }
    },
    getImportantTasks: async (req, res) => {
        try {
            const { id } = req.headers
            const taskData = await User.findById(id).populate({ path: 'tasks', match: { important: true }, options: { sort: { createdAt: -1 } } })
            const importantTasks = taskData.tasks
            Response.sendMessage(res, 200, '', importantTasks)
        } catch (error) {
            return Response.sendError(res, 500, 'Some error occured', error.message)
        }
    },
    getCompletedTasks: async (req, res) => {
        try {
            const { id } = req.headers
            const taskData = await User.findById(id).populate({ path: 'tasks', match: { complete: true }, options: { sort: { createdAt: -1 } } })
            const completedTasks = taskData.tasks
            Response.sendMessage(res, 200, '', completedTasks)
        } catch (error) {
            return Response.sendError(res, 500, 'Some error occured', error.message)
        }
    },
    getIncompletedTasks: async (req, res) => {
        try {
            const { id } = req.headers
            const taskData = await User.findById(id).populate({ path: 'tasks', match: { complete: false }, options: { sort: { createdAt: -1 } } })
            const completedTasks = taskData.tasks
            Response.sendMessage(res, 200, '', completedTasks)
        } catch (error) {
            return Response.sendError(res, 500, 'Some error occured', error.message)
        }
    },
}

module.exports = TaskController