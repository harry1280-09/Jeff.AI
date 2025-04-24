// Hash function using SHA-256
async function hashPassword(password, salt) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + salt);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer)).map(byte => byte.toString(16).padStart(2, "0")).join("");
}

// Generate a random salt
function generateSalt() {
    return Math.random().toString(36).substring(2, 10);
}

// Store predefined hashed accounts securely
async function storeAccounts() {
    const predefinedAccounts = [
        { username: "user1", salt: generateSalt() },
        { username: "user2", salt: generateSalt() },
        { username: "user3", salt: generateSalt() },
        { username: "user4", salt: generateSalt() },
        { username: "user5", salt: generateSalt() }
    ];

    for (let account of predefinedAccounts) {
        account.password = await hashPassword(account.username + "pass", account.salt); // Example password scheme
    }

    localStorage.setItem("accounts", JSON.stringify(predefinedAccounts));
}

// Ensure accounts are initialized on page load
if (!localStorage.getItem("accounts")) {
    storeAccounts();
}
