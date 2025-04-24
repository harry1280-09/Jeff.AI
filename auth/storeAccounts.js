// Hash function using SHA-256
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password); // Removed salt
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer)).map(byte => byte.toString(16).padStart(2, "0")).join("");
}

// Store predefined hashed accounts securely
async function storeAccounts() {
    const predefinedAccounts = [
        { username: "test@jeffai", password: "1234" },
        { username: "user2", password: "mypassword" },
        { username: "user3", password: "helloWorld!" },
        { username: "user4", password: "JeffAIrocks" },
        { username: "user5", password: "superSecret" }
    ];

    for (let account of predefinedAccounts) {
        account.password = await hashPassword(account.password); // Removed salt logic
    }

    localStorage.setItem("accounts", JSON.stringify(predefinedAccounts));
    
    // Add a success message
    console.log("Accounts have been successfully stored.");
}

// Ensure accounts are initialized on page load
if (!localStorage.getItem("accounts")) {
    storeAccounts();
}
