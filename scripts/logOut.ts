export default function logOut(event: MouseEvent): void {
    event.preventDefault();

    localStorage.removeItem("userEmail");
    sessionStorage.removeItem("userEmail");

    window.location.href = "../pages/sign-in.html";
}
