export default function protectSettings() {
    const userRole = localStorage.getItem("currentUserRole") || sessionStorage.getItem("currentUserRole");

    const baseUrl = window.location.origin;

    if (userRole !== "admin") {
        window.location.href = `${baseUrl}/index.html`;
        return;
    }
}
