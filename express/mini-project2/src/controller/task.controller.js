import {readTask, writeTask} from "../utils/file.utils.js";

export const getAllTasks = async (req,res) => {
    const tasks = await readTask();
    res.json(tasks.filter((task) => task.username === req.session.user.username));
}

export const createTask = async(req,res) => {
    const {id, title, desc} = req.body;
    const tasks = await readTask();

    console.log("createTask");
    console.log(typeof(id));

    const newTask = {
        id,
        username: req.session.user.username,
        title,
        desc,
        completed: false
    }

    tasks.push(newTask);
    await writeTask(tasks);
    res.json({"The updated data: ": newTask})
}

export const updateTask = async (req, res) => {
    const curr = req.params.id;   
    const data = req.body.data;
    console.log("===== updateTask type: =====");
    console.log("Type of curr value",typeof(curr));

    console.log("\n\n\n");

    let tasks = await readTask();
    let updated = false;

    tasks = tasks.map((task) => {
        if (task.id.toString() === curr.toString()) {
            updated = true;
            console.log(typeof(task.id));
            return { ...task, desc: data };
        }
        console.log(typeof(task.id));
        return task;
    });

    if (updated) {
        console.log("A value has been updated!!!");
    } else {
        console.log("No task found with id:", curr);
    }

    await writeTask(tasks);
    res.json({ message: "Task updated", data: tasks });
};

export const deleteTask = async (req, res) => {
    const curr = req.params.id;  

    console.log("===== deleteTask type: =====");
    console.log("Type of curr value",typeof(curr));

    let tasks = await readTask();
    const prevLen = tasks.length;   
    tasks = tasks.filter((task) => task.id.toString() !== curr.toString());
    const currLen = tasks.length;

    if (prevLen !== currLen) {
        console.log("Value has been deleted!!!!!");
    } else {
        console.log("No task found with id:", curr);
    }

    await writeTask(tasks);
    res.json({ message: "Task deleted", data: tasks });
};
