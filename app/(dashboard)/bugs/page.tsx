import { getBugs } from "@/app/actions/crud";
import BugsClient from "./BugsClient";

export default async function BugsPage() {
  const data = await getBugs();
  return <BugsClient initialBugs={data} />;
}
