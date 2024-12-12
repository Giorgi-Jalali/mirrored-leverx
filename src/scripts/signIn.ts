import dbUrl from "./config";

document.addEventListener("DOMContentLoaded", () => {
    const signInButton = document.getElementById("sign-in-button") as HTMLButtonElement;

    if (signInButton) {
        signInButton.addEventListener("click", async () => {
            await signIn();
        });
    } else {
        console.error("Sign In button not found.");
    }
});

async function loadUsers(): Promise<any[]> {
    const response = await fetch(`${dbUrl}`);
    if (!response.ok) {
        throw new Error("Failed to load users data.");
    }
    return await response.json();
}

async function signIn(): Promise<void> {
    const passwordElement = document.getElementById("password") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const rememberElement = document.getElementById("remember") as HTMLInputElement;

    if (!passwordElement || !emailElement || !rememberElement) {
        console.error("Required elements not found.");
        alert("Required fields are missing.");
        return;
    }

    const password = passwordElement.value;
    const email = emailElement.value;
    const remember = rememberElement.checked;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (password.length < 2) {
        alert("Password must be at least 2 characters long.");
        return;
    }

    try {
        const users = await loadUsers();
        const user = users.find((u: any) => u.email === email);
        if (!user) {
            alert("User not found. Please sign up.");
            return;
        }

        const checkRequest = await fetch(
            "https://www.toptal.com/developers/bcrypt/api/check-password.json",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `password=${encodeURIComponent(password)}&hash=${encodeURIComponent(user.passwordHash)}`,
            }
        );

        const checkData = await checkRequest.json();

        if (checkData.ok) {

            if (remember) {
                localStorage.setItem("userEmail", email);
            } else {
                sessionStorage.setItem("userEmail", email);
            }

            alert("Login successful!");
            window.location.href = "../index.html";
        } else {
            alert("Invalid password.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to connect to bcrypt API.");
    }
}
