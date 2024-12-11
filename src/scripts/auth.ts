export default function auth() {
    const localEmail = localStorage.getItem("userEmail");
    const sessionEmail = sessionStorage.getItem("userEmail");

    const currentUrl = window.location.href;
    const baseUrl = window.location.origin;
    console.log("baseUrl: ", baseUrl);
    console.log("currentUrl: ", baseUrl);

    const protectedPaths = [
        "/",
        "/index.html",
        "/pages/users.html",
    ];

    const protectedPages = protectedPaths.map(path => `${baseUrl}${path}`);


    if (localEmail || sessionEmail) {
        if (currentUrl.endsWith("sign-in.html") && !currentUrl.endsWith("index.html")) {
            window.location.href = `${baseUrl}/index.html`;
        }
    } else {
        if (protectedPages.some((page) => currentUrl.startsWith(page)) && !currentUrl.endsWith("sign-in.html")) {
            window.location.href = `${baseUrl}/pages/sign-in.html`;
        }   
    }
}
