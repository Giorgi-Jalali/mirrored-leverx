export default function auth() {
    const localBcryptHash = localStorage.getItem("bcryptHash");
    const sessionBcryptHash = sessionStorage.getItem("bcryptHash");
    const currentUrl = window.location.href;
    const protectedPages = ["http://127.0.0.1:5500/index.html", "http://127.0.0.1:5500/pages/users.html"];
    if (localBcryptHash || sessionBcryptHash) {
        if (currentUrl.endsWith("sign-in.html")) {
            window.location.href = "/index.html";
        }
    }
    else {
        if (protectedPages.some((page) => currentUrl.startsWith(page))) {
            window.location.href = "/pages/sign-in.html";
        }
    }
}
