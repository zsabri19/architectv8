const COOKIE = "memoir_unlock";
const STORAGE = "memoir-unlock";

/** Chapter 1 (and the prologue on /book) stay open. The continue prompt starts on chapter 2. */
export const FREE_THROUGH_CHAPTER = 1;

export function isMemoirUnlocked(): boolean {
  if (typeof document === "undefined") return false;
  if (new RegExp(`(?:^|;\\s*)${COOKIE}=1(?:;|$)`).test(document.cookie)) return true;
  try {
    return window.localStorage.getItem(STORAGE) === "1";
  } catch {
    return false;
  }
}

export function persistMemoirUnlock() {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE}=1; Path=/; Max-Age=31536000; SameSite=Lax`;
  try {
    window.localStorage.setItem(STORAGE, "1");
  } catch {
    /* private mode */
  }
}

export function chapterIsOpen(chapterNumber: number, unlocked = isMemoirUnlocked()) {
  return unlocked || chapterNumber <= FREE_THROUGH_CHAPTER;
}
