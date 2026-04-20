"use server";

import { db } from "@/db";
import { tils, bugs, snippets, flashcards, roadmap } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function getUserId() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  return userId;
}

// --- TILs Actions ---
export async function getTils() {
  try {
    const userId = await getUserId();
    return await db.query.tils.findMany({ where: eq(tils.userId, userId), orderBy: (t, { desc }) => [desc(t.createdAt)] });
  } catch (error) {
    console.error("Failed to fetch TILs (Schema missing?):", error);
    return [];
  }
}
export async function addTil(data: { title: string; content: string; tags: string[] }) {
  const userId = await getUserId();
  await db.insert(tils).values({ userId, title: data.title, content: data.content, tags: data.tags });
  revalidatePath('/til');
}

// --- Bugs Actions ---
export async function getBugs() {
  try {
    const userId = await getUserId();
    return await db.query.bugs.findMany({ where: eq(bugs.userId, userId), orderBy: (b, { desc }) => [desc(b.createdAt)] });
  } catch (error) {
    console.error("Failed to fetch Bugs:", error);
    return [];
  }
}
export async function addBug(data: { title: string; description: string }) {
  const userId = await getUserId();
  await db.insert(bugs).values({ userId, title: data.title, description: data.description });
  revalidatePath('/bugs');
}
export async function resolveBug(id: number) {
  const userId = await getUserId();
  await db.update(bugs).set({ status: 'resolved' }).where(eq(bugs.id, id));
  revalidatePath('/bugs');
}

// --- Snippets Actions ---
export async function getSnippets() {
  try {
    const userId = await getUserId();
    return await db.query.snippets.findMany({ where: eq(snippets.userId, userId), orderBy: (s, { desc }) => [desc(s.createdAt)] });
  } catch (error) {
    console.error("Failed to fetch Snippets:", error);
    return [];
  }
}
export async function addSnippet(data: { title: string; code: string; language: string }) {
  const userId = await getUserId();
  await db.insert(snippets).values({ userId, title: data.title, code: data.code, language: data.language });
  revalidatePath('/snippets');
}

// --- Flashcards Actions ---
export async function getFlashcards() {
  try {
    const userId = await getUserId();
    return await db.query.flashcards.findMany({ where: eq(flashcards.userId, userId) });
  } catch (error) {
    console.error("Failed to fetch Flashcards:", error);
    return [];
  }
}
export async function addFlashcard(data: { question: string; answer: string }) {
  const userId = await getUserId();
  await db.insert(flashcards).values({ userId, question: data.question, answer: data.answer });
  revalidatePath('/flashcards');
}
export async function updateFlashcardScore(id: number, scoreChange: number) {
  const userId = await getUserId();
  const card = await db.query.flashcards.findFirst({ where: eq(flashcards.id, id) });
  if (card) {
    await db.update(flashcards).set({ 
      score: (card.score || 0) + scoreChange,
      lastReviewed: new Date()
    }).where(eq(flashcards.id, id));
    revalidatePath('/flashcards');
  }
}

// --- Roadmap Actions ---
export async function getRoadmap() {
  try {
    const userId = await getUserId();
    return await db.query.roadmap.findMany({ where: eq(roadmap.userId, userId), orderBy: (r, { asc }) => [asc(r.createdAt)] });
  } catch (error) {
    console.error("Failed to fetch Roadmap:", error);
    return [];
  }
}
export async function addRoadmapMilestone(data: { title: string; description: string }) {
  const userId = await getUserId();
  await db.insert(roadmap).values({ userId, title: data.title, description: data.description });
  revalidatePath('/roadmap');
}
export async function markRoadmapStatus(id: number, status: 'pending' | 'in-progress' | 'complete') {
  await db.update(roadmap).set({ status }).where(eq(roadmap.id, id));
  revalidatePath('/roadmap');
}
