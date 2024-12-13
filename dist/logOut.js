export default function logOut(event) {
    event.preventDefault();
    localStorage.removeItem("userEmail");
    sessionStorage.removeItem("userEmail");
    window.location.href = "../pages/sign-in.html";
}
