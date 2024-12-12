export default function logOut(event: MouseEvent): void {
    event.preventDefault();

    localStorage.removeItem("userEmail");
    localStorage.removeItem("currentUserRole");
    localStorage.removeItem("currentUserId");

    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("currentUserRole");
    sessionStorage.removeItem("currentUserId");

    window.location.href = `${window.location.origin}/sign-in.html`;
}
