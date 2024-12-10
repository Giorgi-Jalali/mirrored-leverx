"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const email = localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");
    if (email) {
        try {
            const users = yield loadAll();
            const user = users.find((user) => user.email === email);
            if (user) {
                const userLink = document.getElementById("user-profile-link");
                const userName = document.getElementById("user-name");
                const userImage = document.getElementById("user-image");
                userLink.href = `../pages/users.html?id=${user._id}`;
                userName.textContent = `${user.first_name} ${user.last_name}`;
                userImage.src = "." + user.user_avatar || "./assets/default-profile.png";
            }
            else {
                console.error("User not found in data.json");
            }
        }
        catch (error) {
            console.error("Error fetching user data:", error);
        }
    }
    else {
        console.error("No email found in storage.");
    }
}));
function loadAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("../data.json");
        if (!response.ok) {
            throw new Error("Failed to load users data.");
        }
        return yield response.json();
    });
}
