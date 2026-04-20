import { getTils } from "@/app/actions/crud";
import TILClient from "./TILClient";

export default async function TILPage() {
  const data = await getTils();
  return <TILClient initialTils={data} />;
}
