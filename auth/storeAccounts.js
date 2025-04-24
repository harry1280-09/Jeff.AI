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
        { username: "test@jeffai", password: "1234", salt: "randomSalt" },
        { username: "user2", password: "mypassword", salt: "randomSalt" },
        { username: "user3", password: "helloWorld!", salt: "randomSalt" },
        { username: "user4", password: "JeffAIrocks", salt: "randomSalt" },
        { username: "user5", password: "superSecret", salt: "randomSalt" }
    ];

    for (let account of predefinedAccounts) {
        account.salt = generateSalt();
        account.password = await hashPassword(account.password, account.salt);
    }

    localStorage.setItem("accounts", JSON.stringify(predefinedAccounts));
    
    // Add a success message
    console.log("Accounts have been successfully stored.");
}

// Ensure accounts are initialized on page load
if (!localStorage.getItem("accounts")) {
    storeAccounts();
}
