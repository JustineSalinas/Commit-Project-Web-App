import { getTasks } from "@/app/actions/crud";
import TasksClient from "./TasksClient";

export default async function TasksPage() {
  const data = await getTasks();
  return <TasksClient initialTasks={data} />;
}
