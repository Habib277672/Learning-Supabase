import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

export const Form = () => {
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState([]);
  const [updateTask, setUpdateTask] = useState(null); // stores task being edited

  // Create Task Function
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("tasks")
      .insert(newTask)
      .select()
      .maybeSingle();

    if (error) {
      console.log(error);
      return;
    }

    // Update UI instantly
    setTasks((prev) => [...prev, data]);

    // Clear form
    setNewTask({ title: "", description: "" });
  };

  // Fetch Tasks
  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.log(error);
        return;
      }

      setTasks(data);
    };

    fetchTasks();
  }, []);

  // Delete task Function
  const deleteTask = async (id) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.log(error);
      return;
    }

    // Remove from UI
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Update task Function
  const handleUpdatedTask = (task) => {
    setUpdateTask(task); // store clicked task
  };

  // Update Task Form Submit
  const handleTaskUpdate = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("tasks")
      .update({
        title: updateTask.title,
        description: updateTask.description,
      })
      .eq("id", updateTask.id)
      .select()
      .maybeSingle();

    if (error) {
      console.log(error);
      return;
    }

    // Update UI instantly
    setTasks((prev) =>
      prev.map((task) => (task.id === updateTask.id ? data : task)),
    );

    setUpdateTask(null); // close edit form
  };

  return (
    <div className="m-10 flex min-h-screen w-full flex-col items-center gap-4">
      {/* Creating First Task UI */}
      <div className="flex w-full max-w-md flex-col gap-4 rounded-2xl border border-neutral-300 p-6 shadow-2xl">
        <h1 className="text-2xl font-bold">Task Table</h1>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={newTask.title}
            onChange={(e) =>
              setNewTask({ ...newTask, [e.target.name]: e.target.value })
            }
            className="rounded-xl border border-neutral-400 px-4 py-2 outline-none placeholder:text-neutral-600"
          />

          <input
            type="text"
            placeholder="Description"
            name="description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, [e.target.name]: e.target.value })
            }
            className="rounded-xl border border-neutral-400 px-4 py-2 outline-none placeholder:text-neutral-600"
          />

          <button
            type="submit"
            className="cursor-pointer rounded-xl bg-neutral-800 py-2 font-bold text-white"
          >
            Add Task
          </button>
        </form>
      </div>

      {/* Task Rendering Here Which we are fetching from supabase */}
      <div className="flex w-full max-w-3xl flex-col gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="rounded-2xl border border-neutral-300 bg-white p-6 shadow-lg"
          >
            {/* Data Rendering */}
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-bold">{task.title}</h2>
                <p className="text-neutral-600">{task.description}</p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleUpdatedTask(task)}
                  className="cursor-pointer rounded-lg bg-green-700 px-3 py-1 text-white"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="cursor-pointer rounded-lg bg-red-600 px-3 py-1 text-white"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Update Form When user Click on Edit Then This Form will open otherwise it will be close */}
            {updateTask?.id === task.id && (
              <form
                onSubmit={handleTaskUpdate}
                className="mt-4 flex flex-col gap-3 border-t border-neutral-300 pt-4"
              >
                <input
                  type="text"
                  name="title"
                  value={updateTask.title}
                  onChange={(e) =>
                    setUpdateTask({
                      ...updateTask,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="rounded-xl border border-neutral-400 px-4 py-2 outline-none placeholder:text-neutral-600"
                />

                <input
                  type="text"
                  name="description"
                  value={updateTask.description}
                  onChange={(e) =>
                    setUpdateTask({
                      ...updateTask,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="rounded-xl border border-neutral-400 px-4 py-2 outline-none placeholder:text-neutral-600"
                />

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white"
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={() => setUpdateTask(null)}
                    className="cursor-pointer rounded-lg bg-gray-400 px-4 py-2 text-white"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
