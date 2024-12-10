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
document.addEventListener("DOMContentLoaded", () => {
    const signInButton = document.getElementById("sign-in-button");
    signInButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        yield signIn();
    }));
});
function loadUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("../data.json");
        if (!response.ok) {
            throw new Error("Failed to load users data.");
        }
        return yield response.json();
    });
}
function signIn() {
    return __awaiter(this, void 0, void 0, function* () {
        const passwordElement = document.getElementById("password");
        const emailElement = document.getElementById("email");
        const rememberElement = document.getElementById("remember");
        const password = passwordElement.value;
        const email = emailElement.value;
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
            const users = yield loadUsers();
            const user = users.find((u) => u.email === email);
            if (!user) {
                alert("User not found. Please sign up.");
                return;
            }
            const checkRequest = yield fetch("https://www.toptal.com/developers/bcrypt/api/check-password.json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `password=${encodeURIComponent(password)}&hash=${encodeURIComponent(user.passwordHash)}`,
            });
            const checkData = yield checkRequest.json();
            if (checkData.ok) {
                if (rememberElement.checked) {
                    localStorage.setItem("userEmail", email);
                }
                else {
                    sessionStorage.setItem("userEmail", email);
                }
                alert("Login successful!");
                window.location.href = "../index.html";
            }
            else {
                alert("Invalid password.");
            }
        }
        catch (error) {
            console.error("Error:", error);
            alert("Failed to connect to bcrypt API.");
        }
    });
}
