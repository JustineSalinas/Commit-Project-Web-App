import { getRoadmap } from "@/app/actions/crud";
import RoadmapClient from "./RoadmapClient";

export default async function RoadmapPage() {
  const data = await getRoadmap();
  return <RoadmapClient initialRoadmap={data} />;
}
