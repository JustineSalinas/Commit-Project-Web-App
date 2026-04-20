import { getFlashcards } from "@/app/actions/crud";
import FlashcardsClient from "./FlashcardsClient";

export default async function FlashcardsPage() {
  const data = await getFlashcards();
  return <FlashcardsClient initialCards={data} />;
}
