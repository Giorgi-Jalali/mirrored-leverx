document.getElementById("sign-in-button")!.addEventListener("click", signIn);

async function signIn(): Promise<void> {
    const passwordElement = document.getElementById(
        "password"
    ) as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const rememberElement = document.getElementById("remember") as HTMLInputElement;

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
        const cost = 5;
        const hashRequest = await fetch(
            "https://www.toptal.com/developers/bcrypt/api/generate-hash.json",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `password=${encodeURIComponent(password)}&cost=${cost}`,
            }
        );

        const hashData = await hashRequest.json();

        if (hashData.ok) {
            if (remember) {
                localStorage.setItem("bcryptHash", hashData.hash);
            } else {
                sessionStorage.setItem("bcryptHash", hashData.hash);
            }
            // sessionStorage.setItem("email", email);
            // localStorage.setItem("email", email);

            const responseElement = document.getElementById("response");

            if (responseElement) {
                responseElement.textContent = `Hash: ${hashData.hash}`;
            }

            window.location.href = "../index.html";
        } else {
            alert("Error generating hash.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to connect to bcrypt API.");
    }
}
