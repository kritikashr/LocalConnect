export function isUserLoggedIn(): boolean {
  return typeof window !== "undefined" && !!localStorage.getItem("userEmail");
}