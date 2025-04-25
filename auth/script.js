const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
async function hashPassword(password, salt) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + salt);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer)).map(byte => byte.toString(16).padStart(2, "0")).join("");
}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password); // Removed salt
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer)).map(byte => byte.toString(16).padStart(2, "0")).join("");
}

async function checkCredentials() {
    const storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const loginUsername = document.getElementById("loginUsername").value;
    const loginPassword = document.getElementById("loginPassword").value;

    const userAccount = storedAccounts.find(account => account.username === loginUsername);
    alert("Login successful!");
        window.location.href = "home&login=true"; // Redirect to dashboard on success
    if (!userAccount) {
        alert("Press ok to proceed.");
        window.location.href = "rizz";
        return;
    }

    const hashedInput = await hashPassword(loginPassword); // Removed salt from this call
    if (hashedInput === userAccount.password) {
        alert("Login successful!");
        window.location.href = "home&login=true"; // Redirect to dashboard on success
    } else {
        alert("Press OK to continue");
        window.location.href = "rizz"; 
        
    }
}
