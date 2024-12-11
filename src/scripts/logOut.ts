export default function logOut(event: MouseEvent): void {
    event.preventDefault();

    const localHash = localStorage.getItem("userEmail");
    const sessionHash = sessionStorage.getItem("userEmail");

    if (localHash || sessionHash) {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("currentUserRole");
        localStorage.removeItem("currentUserId");

        sessionStorage.removeItem("userEmail");
        sessionStorage.removeItem("currentUserRole");
        sessionStorage.removeItem("currentUserId");
        
        window.location.href = `${window.location.origin}/pages/sign-in.html`;
    }
}
