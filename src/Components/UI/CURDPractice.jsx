import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { RxCross2 } from "react-icons/rx";
import { FaRegEdit } from "react-icons/fa";

export const CURDPractice = () => {
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(newTask);

    // Storing Data in Supabase
    const { data, error } = await supabase
      .from("curd")
      .insert(newTask)
      .select()
      .maybeSingle();

    if (error) {
      console.log(error);
      return;
    }

    // Instantly update UI with new task
    setTasks((prev) => [...prev, data]);

    // Clear form
    setNewTask({ title: "", description: "" });
  };

  //Fetchig Data from Supabase
  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from("curd")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) {
        console.log(error);
        return;
      }
      //Setting data to in state
      setTasks(data);
    };

    fetchTasks();
  }, []);

  // Deleting Existing Task from Supabase
  // Delete Task Function
  const handleDeleteTask = async (id) => {
    const { error } = await supabase.from("curd").delete().eq("id", id);

    if (error) {
      console.log(error);
      return;
    }
    // Remove from UI
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <section className="flex min-h-screen w-full flex-col items-center gap-10 py-10">
      <h1 className="text-3xl font-bold tracking-tight">
        CURD Oprations Practice Using SupaBase
      </h1>

      <div className="flex w-100 items-center rounded-lg border border-neutral-300 p-4 shadow-2xl transition duration-300 hover:scale-[1.03]">
        <form
          onSubmit={handleFormSubmit}
          className="mx-auto flex w-full flex-col items-center gap-6"
        >
          <h2 className="font-mono text-2xl font-bold tracking-tight">
            Create Task
          </h2>

          <input
            className="w-[90%] rounded-lg border border-neutral-500 px-4 py-2 ring-neutral-500 ring-offset-2 transition duration-300 outline-none placeholder:text-neutral-600 focus:border-none focus:ring-2"
            type="text"
            name="title"
            value={newTask.title}
            onChange={(e) =>
              setNewTask({ ...newTask, [e.target.name]: e.target.value })
            }
            placeholder="Title"
          />

          <textarea
            className="w-[90%] rounded-lg border border-neutral-500 px-4 py-2 ring-neutral-500 ring-offset-2 transition duration-300 outline-none placeholder:text-neutral-600 focus:border-none focus:ring-2"
            placeholder="Description"
            name="description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, [e.target.name]: e.target.value })
            }
            rows={5}
          />

          <button
            className="w-[90%] cursor-pointer rounded-full bg-neutral-700 px-4 py-2 text-white transition duration-300 hover:bg-neutral-900 active:scale-95"
            type="submit"
          >
            Add Task
          </button>
        </form>
      </div>

      <div className="flex w-full max-w-xl flex-col rounded-2xl p-4 shadow-2xl">
        <h2 className="mb-4 p-2 text-center font-bold">Tasks</h2>

        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex w-full cursor-pointer flex-col rounded-2xl border border-neutral-300 p-4 shadow-2xl transition duration-300 hover:scale-[1.03]"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-sm font-semibold">{task.title}</h2>
                  <p className="text-xs font-semibold text-neutral-600">
                    {task.description}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <button className="flex cursor-pointer items-center justify-between gap-2 rounded-lg bg-green-500 px-2 py-1 text-xs text-white">
                    Edit
                    <FaRegEdit />
                  </button>

                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-500 px-2 py-1 text-xs text-white"
                  >
                    Delete <RxCross2 />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-center text-sm text-neutral-500">
            No Task Exist
          </h2>
        )}
      </div>
    </section>
  );
};
