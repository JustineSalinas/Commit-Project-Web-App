"use client";

import { useSyncQueue } from "@/lib/syncQueue";

export function SyncQueueProvider() {
  useSyncQueue();
  return null;
}
