"use client";

import { useEffect } from "react";
import { createTask, updateTask, createSessionLog, createDistraction, resolveDistraction } from "@/app/actions/crud";

const ACTIONS_MAP: Record<string, any> = {
  createTask,
  updateTask,
  createSessionLog,
  createDistraction,
  resolveDistraction
};

export async function executeWithQueue(actionName: string, ...params: any[]) {
  if (typeof window !== 'undefined' && !navigator.onLine) {
    queueOperation(actionName, params);
    return { success: false, error: "Offline. Operation queued." };
  }

  try {
    const action = ACTIONS_MAP[actionName];
    if (!action) throw new Error(`Action ${actionName} not found`);
    return await action(...params);
  } catch (error) {
    if (typeof window !== 'undefined' && !navigator.onLine) {
      queueOperation(actionName, params);
      return { success: false, error: "Offline. Operation queued." };
    }
    throw error;
  }
}

function queueOperation(actionName: string, params: any[]) {
  const queueStr = localStorage.getItem("commit_sync_queue");
  const queue = queueStr ? JSON.parse(queueStr) : [];
  queue.push({ actionName, params, timestamp: Date.now() });
  localStorage.setItem("commit_sync_queue", JSON.stringify(queue));
  console.log(`Queued offline operation: ${actionName}`);
}

export function useSyncQueue() {
  useEffect(() => {
    const processQueue = async () => {
      if (!navigator.onLine) return;
      
      const queueStr = localStorage.getItem("commit_sync_queue");
      if (!queueStr) return;
      
      const queue = JSON.parse(queueStr);
      if (queue.length === 0) return;

      console.log(`Processing ${queue.length} queued operations...`);
      
      const remainingQueue = [];
      for (const op of queue) {
        try {
          const action = ACTIONS_MAP[op.actionName];
          if (action) {
            await action(...op.params);
          }
        } catch (error) {
          console.error(`Failed to sync operation ${op.actionName}:`, error);
          remainingQueue.push(op); // Keep it in queue if it failed for another reason
        }
      }

      localStorage.setItem("commit_sync_queue", JSON.stringify(remainingQueue));
    };

    window.addEventListener("online", processQueue);
    // Also try processing on mount
    processQueue();

    return () => window.removeEventListener("online", processQueue);
  }, []);
}
