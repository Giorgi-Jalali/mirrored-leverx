document.addEventListener("DOMContentLoaded", async () => {
    const email = localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");

    if (email) {
        try {
            const users = await loadAll();
            const user = users.find((user: any) => user.email === email);

            if (user) {
                const userLink = document.getElementById("user-profile-link") as HTMLAnchorElement;
                const userName = document.getElementById("user-name") as HTMLParagraphElement;
                const userImage = document.getElementById("user-image") as HTMLImageElement;

                userLink.href = `../pages/users.html?id=${user._id}`;

                userName.textContent = `${user.first_name} ${user.last_name}`;
                userImage.src = "." + user.user_avatar || "./assets/default-profile.png";

            } else {
                console.error("User not found in data.json");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    } else {
        console.error("No email found in storage.");
    }
});

async function loadAll(): Promise<any[]> {
    const response = await fetch("../data.json");
    if (!response.ok) {
        throw new Error("Failed to load users data.");
    }
    return await response.json();
}
