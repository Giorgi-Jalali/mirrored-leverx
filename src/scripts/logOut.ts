export default function logOut(event: MouseEvent): void {
    event.preventDefault();

    const localHash = localStorage.getItem("bcryptHash");
    const sessionHash = sessionStorage.getItem("bcryptHash");

    if (localHash || sessionHash) {
        localStorage.removeItem("bcryptHash");
        localStorage.removeItem("email");
        localStorage.removeItem("role");

        sessionStorage.removeItem("bcryptHash");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("role");
        
        window.location.href = "./pages/sign-in.html";
    }
}
