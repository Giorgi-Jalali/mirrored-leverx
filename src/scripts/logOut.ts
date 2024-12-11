export default function logOut(event: MouseEvent): void {
    event.preventDefault();

    const localHash = localStorage.getItem("userEmail");
    const sessionHash = sessionStorage.getItem("userEmail");

    if (localHash || sessionHash) {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("role");

        sessionStorage.removeItem("userEmail");
        sessionStorage.removeItem("role");
        
        window.location.href = "./pages/sign-in.html";
    }
}
