export default function logOut(event: MouseEvent): void {
    event.preventDefault();

    const localHash = localStorage.getItem("bcryptHash");
    const sessionHash = sessionStorage.getItem("bcryptHash");

    if (localHash || sessionHash) {
        localStorage.removeItem("bcryptHash");
        sessionStorage.removeItem("bcryptHash");
        
        window.location.href = "./pages/sign-in.html";
    }
}
