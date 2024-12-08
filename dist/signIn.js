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
document.getElementById("sign-in-button").addEventListener("click", signIn);
function signIn() {
    return __awaiter(this, void 0, void 0, function* () {
        const passwordElement = document.getElementById("password");
        const emailElement = document.getElementById("email");
        const rememberElement = document.getElementById("remember");
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
            const hashRequest = yield fetch("https://www.toptal.com/developers/bcrypt/api/generate-hash.json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `password=${encodeURIComponent(password)}&cost=${cost}`,
            });
            const hashData = yield hashRequest.json();
            if (hashData.ok) {
                if (remember) {
                    localStorage.setItem("bcryptHash", hashData.hash);
                }
                else {
                    sessionStorage.setItem("bcryptHash", hashData.hash);
                }
                const responseElement = document.getElementById("response");
                if (responseElement) {
                    responseElement.textContent = `Hash: ${hashData.hash}`;
                }
                window.location.href = "../index.html";
            }
            else {
                alert("Error generating hash.");
            }
        }
        catch (error) {
            console.error("Error:", error);
            alert("Failed to connect to bcrypt API.");
        }
    });
}
