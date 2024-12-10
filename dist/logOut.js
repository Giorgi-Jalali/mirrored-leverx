export default function logOut(event) {
    event.preventDefault();
    const localHash = localStorage.getItem("userEmail");
    const sessionHash = sessionStorage.getItem("userEmail");
    if (localHash || sessionHash) {
        localStorage.removeItem("userEmail");
        sessionStorage.removeItem("userEmail");
        window.location.href = "./pages/sign-in.html";
    }
}
