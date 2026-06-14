import { redirect } from "next/navigation";

// Dashboard overview moved to /dashboard to avoid URL conflict with the public landing page at /
export default function DashboardRootRedirect() {
  redirect("/dashboard");
}
