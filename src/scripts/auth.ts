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

        // if (userRole !== "admin" && currentUrl.endsWith("settings.html")) {
        //     console.log("hello from not admin");
        //     window.location.href = `${baseUrl}/index.html`;
        //     return;
        // } else 
        if (currentUrl.endsWith("/sign-in.html")) {
            console.log("hello from second");
            
            window.location.href = `${baseUrl}/index.html`;
            return;
        }

    } else {
        if (protectedPages.some((page) => currentUrl.startsWith(page))) {
            console.log("hello from 3");

            window.location.href = `${baseUrl}/sign-in.html`;
            return;
        }
    }
}
