export default function logOut(event: MouseEvent): void {
    event.preventDefault();

    console.log("hello from logOut");
    const hash = sessionStorage.getItem("bcryptHash");

    if (hash) {
        console.log("::: ", hash);
        sessionStorage.removeItem("bcryptHash");
        // sessionStorage.removeItem("email");
        // localStorage.removeItem("bcryptHash");
        // localStorage.removeItem("email");

        window.location.href = "./pages/sign-in.html";
    }
}
