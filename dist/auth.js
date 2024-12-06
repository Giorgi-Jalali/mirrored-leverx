export default function auth() {
    // const bcryptHash = localStorage.getItem("bcryptHash");
    const bcryptHash = sessionStorage.getItem("bcryptHash");
    console.log("bcrypt from auth.js: ", bcryptHash);
    const currentUrl = window.location.href;
    const protectedPages = ["http://127.0.0.1:5500/index.html", "http://127.0.0.1:5500/pages/users.html"];
    if (!bcryptHash) {
        if (protectedPages.some((page) => currentUrl.startsWith(page))) {
            window.location.href = "/pages/sign-in.html";
        }
    }
    else {
        if (currentUrl.endsWith("sign-in.html")) {
            window.location.href = "/index.html";
        }
    }
}
