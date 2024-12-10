export default function auth() {
    const localEmail = localStorage.getItem("userEmail");
    const sessionEmail = sessionStorage.getItem("userEmail");
    const currentUrl = window.location.href;
    const protectedPages = [
        "http://127.0.0.1:5500/",
        "http://127.0.0.1:5500/index.html",
        "http://127.0.0.1:5500/pages/users.html",
    ];
    if (localEmail || sessionEmail) {
        if (currentUrl.endsWith("sign-in.html") && !currentUrl.endsWith("index.html")) {
            window.location.href = "/index.html";
        }
    }
    else {
        if (protectedPages.some((page) => currentUrl.startsWith(page)) && !currentUrl.endsWith("sign-in.html")) {
            window.location.href = "/pages/sign-in.html";
        }
    }
}
