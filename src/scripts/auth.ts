export default function auth() {
    const localBcryptHash = localStorage.getItem("bcryptHash");
    const sessionBcryptHash = sessionStorage.getItem("bcryptHash");

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


    if (localBcryptHash || sessionBcryptHash) {
        if (currentUrl.endsWith("sign-in.html") && !currentUrl.endsWith("index.html")) {
            window.location.href = `${baseUrl}/index.html`;
        }
    } else {
        if (protectedPages.some((page) => currentUrl.startsWith(page)) && !currentUrl.endsWith("sign-in.html")) {
            window.location.href = `${baseUrl}/pages/sign-in.html`;
        }   
    }
}
