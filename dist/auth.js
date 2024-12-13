export default function auth() {
    const storedEmail = localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");
    const allowedPaths = [
        "/index.html",
        "/pages/users.html",
        "/pages/404.html",
        "/pages/sign-in.html",
    ];
    const currentPath = window.location.pathname;
    const isAllowedPath = allowedPaths.includes(currentPath);
    if (!isAllowedPath) {
        if (!storedEmail) {
            window.location.href = "http://127.0.0.1:5500/pages/sign-in.html";
        }
        else {
            window.location.href = "http://127.0.0.1:5500/index.html";
        }
    }
}
