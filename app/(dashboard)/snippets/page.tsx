import { getSnippets } from "@/app/actions/crud";
import SnippetsClient from "./SnippetsClient";

export default async function SnippetsPage() {
  const data = await getSnippets();
  return <SnippetsClient initialSnippets={data} />;
}
