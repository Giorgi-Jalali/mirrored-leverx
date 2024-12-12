export default function auth() {
    const storedUserId = localStorage.getItem("currentUserId") || sessionStorage.getItem("currentUserId");
    const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");
    const storedEmail = localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");

    const currentUrl = window.location.href;
    const baseUrl = window.location.origin;

    const protectedPaths = [
        "/index.html",
        "/users.html",
        "/settings.html",
    ];
    
    const protectedPages = protectedPaths.map(path => `${baseUrl}${path}`);

    if (storedEmail) {
        if (currentUrl.endsWith("/sign-in.html")) {
            window.location.href = `${baseUrl}/index.html`;
            return;
        }

    } else {
        if (protectedPages.some((page) => currentUrl.startsWith(page))) {
            window.location.href = `${baseUrl}/sign-in.html`;
            return;
        }
    }
}
