export default function protectHomePage() {
    const storedEmail = localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");

    const protectedPaths = [
        "/index.html",
        "/users.html", 
        "/settings.html",
        "/404.html",
    ];

    const currentPath = window.location.pathname;
    const baseUrl = window.location.origin;

    const protectedPages = protectedPaths.map(path => `${baseUrl}${path}`);
    
    if (!protectedPaths.some(path => currentPath.startsWith(path))) {
        window.location.href = `${baseUrl}/index.html`;
    }

    if (storedEmail) {
        if (!protectedPaths.some(path => currentPath.startsWith(path))) {
            window.location.href = `${baseUrl}/index.html`;
            return;
        }
    } else {
        if (protectedPages.some((page) => currentPath.startsWith(page))) {
            window.location.href = `${baseUrl}/sign-in.html`;
            return;
        }
    }
}
