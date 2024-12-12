export default function protectHomePage() {
    const storedEmail = localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");

    const protectedPaths = [
        "/",
        "/index.html",
        "/users.html", 
        "/settings.html",
        "/404.html",
    ];

    const currentUrl = window.location.href;
    const baseUrl = window.location.origin;

    const protectedPages = protectedPaths.map(path => `${baseUrl}${path}`);


    if (storedEmail) {

        if (!protectedPaths.some(path => currentUrl.includes(path))) {
            window.location.href = `${baseUrl}/`;
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
