"use server";

import { db } from "@/db";
import { tils, bugs, snippets, flashcards, roadmap, journals, focusSessions, profiles, tasks, sessionLogs, distractions } from "@/db/schema";
import { eq, gte, sql, or } from "drizzle-orm";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function getUserId() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  return userId;
}

export async function getUserProfile() {
  const userId = await getUserId();
  try {
    // We use a try-catch for the specific query to handle missing columns gracefully
    const results = await db.select().from(profiles).where(eq(profiles.clerkId, userId));
    return results[0] || null;
  } catch (error: any) {
    // If the error is about missing columns (title/bio), try a limited selection
    if (error.code === '42703' || error.message?.includes('column')) {
      try {
        console.warn("Detected missing columns in profiles table, falling back to limited selection.");
        // Only select columns we are sure exist
        const limitedResults = await db.execute(sql`SELECT id, clerk_id, name, email, has_completed_onboarding FROM profiles WHERE clerk_id = ${userId}`);
        const user = limitedResults[0] as any;
        if (user) {
          return {
            ...user,
            clerkId: user.clerk_id, // Map snake_case to camelCase
            title: null,
            bio: null
          };
        }
      } catch (innerError) {
        console.error("Failed even limited profile fetch:", innerError);
      }
    }
    console.error("Failed to fetch user profile:", error);
    return null;
  }
}

export async function completeOnboarding(preferences: any) {
  try {
    const user = await currentUser();
    if (!user) return { success: false, error: "No user found" };

    const email = user.emailAddresses[0]?.emailAddress;
    if (!email) return { success: false, error: "Primary email address not found" };
    
    const name = user.fullName || `${user.firstName || ""} ${user.lastName || ""}`.trim();

    // Split into two simple queries to avoid OR issues in some drivers
    const resultsById = await db.select().from(profiles).where(eq(profiles.clerkId, user.id));
    let existingUser = resultsById[0];

    if (!existingUser) {
      const resultsByEmail = await db.select().from(profiles).where(eq(profiles.email, email));
      existingUser = resultsByEmail[0];
    }

    if (existingUser) {
      await db.update(profiles)
        .set({ 
          clerkId: user.id, // Sync clerkId in case we found them by email
          name: name,
          email: email,
          hasCompletedOnboarding: true,
          preferences: preferences
        })
        .where(eq(profiles.id, existingUser.id));
    } else {
      await db.insert(profiles).values({
        clerkId: user.id,
        email: email,
        name: name,
        hasCompletedOnboarding: true,
        preferences: preferences
      });
    }

    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error("Failed to complete onboarding:", error);
    return { success: false, error: error.message || "An unexpected database error occurred" };
  }
}

// --- TILs Actions ---
export async function getTils() {
  const userId = await getUserId();
  try {
    return await db.query.tils.findMany({ where: eq(tils.userId, userId), orderBy: (t, { desc }) => [desc(t.createdAt)] });
  } catch (error) {
    console.error("Failed to fetch TILs:", error);
    return [];
  }
}
export async function addTil(data: { title: string; content: string; tags: string[] }) {
  try {
    const userId = await getUserId();
    await db.insert(tils).values({ userId, title: data.title, content: data.content, tags: data.tags });
    revalidatePath('/til');
    return { success: true };
  } catch (error: any) {
    console.error("Failed to add TIL:", error);
    return { success: false, error: error.message };
  }
}

// --- Bugs Actions ---
export async function getBugs() {
  const userId = await getUserId();
  try {
    return await db.query.bugs.findMany({ where: eq(bugs.userId, userId), orderBy: (b, { desc }) => [desc(b.createdAt)] });
  } catch (error) {
    console.error("Failed to fetch Bugs:", error);
    return [];
  }
}
export async function addBug(data: { title: string; description: string }) {
  try {
    const userId = await getUserId();
    await db.insert(bugs).values({ userId, title: data.title, description: data.description });
    revalidatePath('/bugs');
    return { success: true };
  } catch (error: any) {
    console.error("Failed to add Bug:", error);
    return { success: false, error: error.message };
  }
}
export async function resolveBug(id: number) {
  try {
    await db.update(bugs).set({ status: 'resolved' }).where(eq(bugs.id, id));
    revalidatePath('/bugs');
    return { success: true };
  } catch (error: any) {
    console.error("Failed to resolve Bug:", error);
    return { success: false, error: error.message };
  }
}

// --- Snippets Actions ---
export async function getSnippets() {
  const userId = await getUserId();
  try {
    return await db.query.snippets.findMany({ where: eq(snippets.userId, userId), orderBy: (s, { desc }) => [desc(s.createdAt)] });
  } catch (error) {
    console.error("Failed to fetch Snippets:", error);
    return [];
  }
}
export async function addSnippet(data: { title: string; code: string; language: string }) {
  try {
    const userId = await getUserId();
    await db.insert(snippets).values({ userId, title: data.title, code: data.code, language: data.language });
    revalidatePath('/snippets');
    return { success: true };
  } catch (error: any) {
    console.error("Failed to add Snippet:", error);
    return { success: false, error: error.message };
  }
}

// --- Flashcards Actions ---
export async function getFlashcards() {
  const userId = await getUserId();
  try {
    return await db.query.flashcards.findMany({ where: eq(flashcards.userId, userId) });
  } catch (error) {
    console.error("Failed to fetch Flashcards:", error);
    return [];
  }
}
export async function addFlashcard(data: { question: string; answer: string }) {
  try {
    const userId = await getUserId();
    await db.insert(flashcards).values({ userId, question: data.question, answer: data.answer });
    revalidatePath('/flashcards');
    return { success: true };
  } catch (error: any) {
    console.error("Failed to add Flashcard:", error);
    return { success: false, error: error.message };
  }
}
export async function updateFlashcardScore(id: number, scoreChange: number) {
  try {
    const card = await db.query.flashcards.findFirst({ where: eq(flashcards.id, id) });
    if (card) {
      await db.update(flashcards).set({ 
        score: (card.score || 0) + scoreChange,
        lastReviewed: new Date()
      }).where(eq(flashcards.id, id));
      revalidatePath('/flashcards');
    }
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update Flashcard score:", error);
    return { success: false, error: error.message };
  }
}

// --- Roadmap Actions ---
export async function getRoadmap() {
  const userId = await getUserId();
  try {
    return await db.query.roadmap.findMany({ where: eq(roadmap.userId, userId), orderBy: (r, { asc }) => [asc(r.createdAt)] });
  } catch (error) {
    console.error("Failed to fetch Roadmap:", error);
    return [];
  }
}
export async function addRoadmapMilestone(data: { title: string; description: string }) {
  try {
    const userId = await getUserId();
    await db.insert(roadmap).values({ userId, title: data.title, description: data.description });
    revalidatePath('/roadmap');
    return { success: true };
  } catch (error: any) {
    console.error("Failed to add Milestone:", error);
    return { success: false, error: error.message };
  }
}
export async function markRoadmapStatus(id: number, status: 'pending' | 'in-progress' | 'complete') {
  try {
    await db.update(roadmap).set({ status }).where(eq(roadmap.id, id));
    revalidatePath('/roadmap');
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update Roadmap status:", error);
    return { success: false, error: error.message };
  }
}
// --- Journal Actions ---
export async function getJournals() {
  const userId = await getUserId();
  try {
    return await db.query.journals.findMany({ 
      where: eq(journals.userId, userId), 
      orderBy: (j, { desc }) => [desc(j.createdAt)] 
    });
  } catch (error) {
    console.error("Failed to fetch Journals:", error);
    return [];
  }
}

export async function addJournalEntry(data: { title: string; content: string }) {
  try {
    const userId = await getUserId();
    const [result] = await db.insert(journals).values({ 
      userId, 
      title: data.title, 
      content: data.content 
    }).returning();
    revalidatePath('/journal');
    return { success: true, entry: result };
  } catch (error: any) {
    console.error("Failed to add Journal Entry:", error);
    return { success: false, error: error.message };
  }
}

export async function updateJournalEntry(id: number, data: { title?: string; content?: string }) {
  try {
    const userId = await getUserId();
    await db.update(journals).set({ 
      ...data,
      updatedAt: new Date()
    }).where(eq(journals.id, id));
    revalidatePath('/journal');
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update Journal Entry:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteJournalEntry(id: number) {
  try {
    const userId = await getUserId();
    await db.delete(journals).where(eq(journals.id, id));
    revalidatePath('/journal');
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete Journal Entry:", error);
    return { success: false, error: error.message };
  }
}

// --- Stats & Dashboard ---
export async function logFocusSession(data: { durationMinutes: number; focusType: string }) {
  try {
    const userId = await getUserId();
    await db.insert(focusSessions).values({ 
      userId, 
      durationMinutes: data.durationMinutes, 
      focusType: data.focusType 
    });
    return { success: true };
  } catch (error: any) {
    console.error("Failed to log focus session:", error);
    return { success: false, error: error.message };
  }
}

export async function getDashboardStats() {
  const userId = await getUserId();
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 1. Focus Time Today
    const sessionsToday = await db.query.focusSessions.findMany({
      where: sql`${focusSessions.userId} = ${userId} AND ${focusSessions.createdAt} >= ${today}`
    });
    const focusTimeToday = sessionsToday.reduce((acc, s) => acc + s.durationMinutes, 0);

    // 2. Flashcards Due (simplified: count all if none reviewed recently, or those with low score)
    const cards = await db.query.flashcards.findMany({ where: eq(flashcards.userId, userId) });
    const cardsDue = cards.filter(c => !c.lastReviewed || (c.score || 0) < 3).length;

    // 3. Streak Calculation (Aggregate activity dates)
    const activityDates = new Set<string>();
    
    const [tilsData, sessionsData, journalsData] = await Promise.all([
      db.query.tils.findMany({ where: eq(tils.userId, userId), columns: { createdAt: true } }),
      db.query.focusSessions.findMany({ where: eq(focusSessions.userId, userId), columns: { createdAt: true } }),
      db.query.journals.findMany({ where: eq(journals.userId, userId), columns: { createdAt: true } })
    ]);

    [...tilsData, ...sessionsData, ...journalsData].forEach(item => {
      if (item.createdAt) {
        activityDates.add(new Date(item.createdAt).toDateString());
      }
    });

    let streak = 0;
    const checkDate = new Date();
    checkDate.setHours(0, 0, 0, 0);

    // If no activity today, check if there was activity yesterday to continue the streak
    if (!activityDates.has(checkDate.toDateString())) {
      checkDate.setDate(checkDate.getDate() - 1);
    }

    while (activityDates.has(checkDate.toDateString())) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }

    return {
      focusTime: `${Math.floor(focusTimeToday / 60)}h ${focusTimeToday % 60}m`,
      cardsDue,
      streak: `${streak} Days`,
      heatmap: Array.from(activityDates) // Raw dates for heatmap
    };
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return { focusTime: "0h 0m", cardsDue: 0, streak: "0 Days", heatmap: [] };
  }
}

export async function getProfileData() {
  const userId = await getUserId();
  try {
    const userProfile = await getUserProfile();
    
    // Get recent TILs
    const userTils = await db.query.tils.findMany({ 
      where: eq(tils.userId, userId), 
      orderBy: (t, { desc }) => [desc(t.createdAt)],
    });
    
    // Get Roadmap concepts completed
    const completedConcepts = await db.query.roadmap.findMany({
      where: sql`${roadmap.userId} = ${userId} AND ${roadmap.status} = 'complete'`
    });

    // Get heatmap activity dates (all TILs, sessions, journals, snippets)
    const [sessionsData, journalsData, snippetsData] = await Promise.all([
      db.query.focusSessions.findMany({ where: eq(focusSessions.userId, userId), columns: { createdAt: true } }),
      db.query.journals.findMany({ where: eq(journals.userId, userId), columns: { createdAt: true } }),
      db.query.snippets.findMany({ where: eq(snippets.userId, userId), columns: { createdAt: true } })
    ]);

    const activityDates = new Map<string, number>();
    
    const incrementDate = (dateStr: Date | null) => {
      if (!dateStr) return;
      // Using local date string for grouping
      const d = new Date(dateStr).toISOString().split('T')[0];
      activityDates.set(d, (activityDates.get(d) || 0) + 1);
    };

    [...userTils, ...sessionsData, ...journalsData, ...snippetsData].forEach(item => {
      incrementDate(item.createdAt);
    });

    // We'll calculate a mock consistency score based on recent activity, or just hardcode if 0
    let totalActivity = 0;
    activityDates.forEach(count => totalActivity += count);
    const consistencyScore = totalActivity > 0 ? Math.min(100, 50 + totalActivity) : 0;

    return {
      user: userProfile,
      tilsCount: userTils.length,
      recentTils: userTils.slice(0, 3),
      conceptsMastered: completedConcepts.length,
      topConcepts: completedConcepts.slice(0, 3), // We can use roadmap titles
      heatmapData: Object.fromEntries(activityDates),
      consistencyScore: (consistencyScore).toFixed(1)
    };
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
    return null;
  }
}

// --- TASKS ACTIONS ---
export async function getTasks() {
  const userId = await getUserId();
  try {
    return await db.query.tasks.findMany({ where: eq(tasks.userId, userId), orderBy: (t, { desc }) => [desc(t.createdAt)] });
  } catch (error) {
    console.error("Failed to fetch Tasks:", error);
    return [];
  }
}

export async function createTask(data: { id: string; title: string; description?: string; estimatedPomos?: number }) {
  try {
    const userId = await getUserId();
    await db.insert(tasks).values({ 
      id: data.id,
      userId, 
      title: data.title, 
      description: data.description || '', 
      estimatedPomos: data.estimatedPomos || 1,
      status: 'todo'
    });
    revalidatePath('/tasks');
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create Task:", error);
    return { success: false, error: error.message };
  }
}

export async function updateTask(id: string, updates: any) {
  try {
    await db.update(tasks).set(updates).where(eq(tasks.id, id));
    revalidatePath('/tasks');
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update Task:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteTask(id: string) {
  try {
    await db.delete(tasks).where(eq(tasks.id, id));
    revalidatePath('/tasks');
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete Task:", error);
    return { success: false, error: error.message };
  }
}

// --- SESSION LOGS ACTIONS ---
export async function getSessionLogs() {
  const userId = await getUserId();
  try {
    return await db.query.sessionLogs.findMany({ where: eq(sessionLogs.userId, userId), orderBy: (s, { desc }) => [desc(s.timestamp)] });
  } catch (error) {
    console.error("Failed to fetch Session Logs:", error);
    return [];
  }
}

export async function createSessionLog(data: { id: string; taskId?: string; taskTitle?: string; commitMessage: string; duration: number; timezone: string }) {
  try {
    const userId = await getUserId();
    await db.insert(sessionLogs).values({ 
      id: data.id,
      userId, 
      taskId: data.taskId,
      taskTitle: data.taskTitle,
      commitMessage: data.commitMessage,
      duration: data.duration,
      timezone: data.timezone
    });
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create Session Log:", error);
    return { success: false, error: error.message };
  }
}

// --- DISTRACTION ACTIONS ---
export async function getDistractions() {
  const userId = await getUserId();
  try {
    // Return unresolved first
    return await db.query.distractions.findMany({ 
      where: eq(distractions.userId, userId),
      orderBy: (d, { asc, desc }) => [asc(d.resolved), desc(d.timestamp)]
    });
  } catch (error) {
    console.error("Failed to fetch Distractions:", error);
    return [];
  }
}

export async function createDistraction(data: { id: string; content: string }) {
  try {
    const userId = await getUserId();
    await db.insert(distractions).values({ 
      id: data.id,
      userId, 
      content: data.content 
    });
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create Distraction:", error);
    return { success: false, error: error.message };
  }
}

export async function resolveDistraction(id: string) {
  try {
    await db.update(distractions).set({ resolved: true }).where(eq(distractions.id, id));
    return { success: true };
  } catch (error: any) {
    console.error("Failed to resolve Distraction:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteDistraction(id: string) {
  try {
    await db.delete(distractions).where(eq(distractions.id, id));
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete Distraction:", error);
    return { success: false, error: error.message };
  }
}
