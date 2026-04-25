import { getRoadmap } from "@/app/actions/crud";
import RoadmapClient from "./RoadmapClient";
import { auth } from "@clerk/nextjs/server";

export default async function RoadmapPage() {
  const data = await getRoadmap();
  const { userId } = await auth();
  return <RoadmapClient initialRoadmap={data} userId={userId || ""} />;
}
