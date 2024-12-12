import backUrl from "./config";

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

                if (localStorage.getItem("userEmail")) {
                    localStorage.setItem("currentUserRole", user.role);
                    localStorage.setItem("currentUserId", user.id);
                } else if (sessionStorage.getItem("userEmail")){
                    sessionStorage.setItem("currentUserRole", user.role);
                    sessionStorage.setItem("currentUserId", user.id);
                }

                

                userLink.href = `../pages/users.html?id=${user.id}`;

                userName.textContent = `${user.first_name} ${user.last_name}`;
                userImage.src = "." + user.user_avatar || "../assets/Sophia.png";

            } else {
                console.error("User not found in db.json");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    } else {
        console.error("No email found in storage.");
    }
});

async function loadAll(): Promise<any[]> {
    const response = await fetch(`${backUrl}`);
    if (!response.ok) {
        throw new Error("Failed to load users data.");
    }
    return await response.json();
}
