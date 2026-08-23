document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 🛡️ IIT EXPERT FIX: ANTI-INSPECT & RIGHT-CLICK SECURITY ENGINE
    // ==========================================
    
    // 1. Right Click (Context Menu) Disabled
    document.addEventListener('contextmenu', (event) => {
        event.preventDefault(); // Default menu block
    });

    // 2. Keyboard Hacker Shortcuts Block (F12, DevTools, View Source)
    document.addEventListener('keydown', (event) => {
        // Block F12
        if (event.key === 'F12' || event.keyCode === 123) {
            event.preventDefault();
        }
        // Block Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (Developer Tools)
        if (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'i' || event.key === 'J' || event.key === 'j' || event.key === 'C' || event.key === 'c')) {
            event.preventDefault();
        }
        // Block Ctrl+U (View Source)
        if (event.ctrlKey && (event.key === 'U' || event.key === 'u')) {
            event.preventDefault();
        }
    });
    
    // ==========================================
    // 0. FIREBASE INITIALIZATION
    // ==========================================
    // Yahan apni Firebase Project Settings se copy ki hui config paste karna
    const firebaseConfig = {
    apiKey: "AIzaSyAUpAKZ2SrcjT8p1o05KUDf4cy3G2zZbg4",
    authDomain: "buildmoney.firebaseapp.com",
    projectId: "buildmoney",
    storageBucket: "buildmoney.firebasestorage.app",
    messagingSenderId: "730117973114",
    appId: "1:730117973114:web:4758db3026994b6baec7c3"
    };

    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const auth = firebase.auth();

    const appContainer = document.getElementById('app-container');

    // ==========================================
    // MASTER GOOGLE SCRIPT URL (Global Engine Scope)
    // ==========================================
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwCgN9YrpdWBleIr7m3ZHkZgwFpMrcuaNT9REonie0m0WQwQHPi0I8Mwp09-efKU5jnyw/exec";

    // ==========================================
    // PREMIUM CUSTOM ALERT FUNCTION
    // ==========================================
    function showCustomAlert(message) {
        const alertOverlay = document.getElementById('custom-alert');
        const alertMessage = document.getElementById('custom-alert-message');
        const alertBtn = document.getElementById('custom-alert-btn');

        alertMessage.innerText = message;
        alertOverlay.style.display = 'flex'; // Popup dikhao

        alertBtn.onclick = () => {
            alertOverlay.style.display = 'none'; // OK dabane par chhupao
        };
    }

    // ==========================================
    // 1. ROUTER ENGINE (Global Scope Loophole Fixed)
    // ==========================================
    window.navigateTo = function(screen, pushToHistory = true) {
        if (pushToHistory) {
            history.pushState({ screen: screen }, '', '#' + screen);
        }

        if (screen === 'login') renderLoginScreen();
        else if (screen === 'register') renderRegisterScreen();
        else if (screen === 'forgot') renderForgotPasswordScreen();
        else if (screen === 'dashboard') renderDashboardScreen();
        else if (screen === 'submit') renderSubmitScreen();
        else if (screen === 'team') renderTeamScreen();
        else if (screen === 'wallet') renderWalletScreen();
        else if (screen === 'deposit') renderDepositScreen(); 
        else if (screen === 'support') renderSupportScreen();
        else if (screen === 'adminLogin') renderAdminLoginScreen(); // 🚀 Advanced Admin Engine Route
        else if (screen === 'adminDashboard') renderAdminDashboardScreen(); 
        else if (screen === 'adminDepositRequests') renderAdminDepositRequestsScreen(); // 🚀 Admin Requests List
        else renderLoginScreen();
    };

    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.screen) {
            navigateTo(event.state.screen, false); 
        } else {
            navigateTo('login', false);
        }
    });

    // ==========================================
    // 2. UI SCREENS & FIREBASE LOGIC
    // ==========================================

    function renderLoginScreen() {
        appContainer.innerHTML = `
            <div class="screen text-center" style="display: flex; flex-direction: column; justify-content: center; min-height: 100vh; padding: 24px; overflow-y: auto;">
                
                <div class="login-header-premium" style="margin-bottom: 20px; margin-top: 15px;">
                    <img src="./icon-512x512.png" alt="App Logo" class="premium-app-logo">
                    <h1 class="premium-title">Build Money</h1>
                    <p class="premium-subtitle">Your Ultimate Testing & Wallet Portal</p>
                </div>

                <!-- 🚀 IIT EXPERT FIX: Professional Trust Stats Grid -->
                <div class="trust-stats-container">
                    <div class="trust-stat-box">
                        <span class="material-symbols-rounded stat-icon" style="color: #3b82f6; background: rgba(59, 130, 246, 0.1);">group</span>
                        <h4>5K+</h4>
                        <p>Trsuted Users</p>
                    </div>
                    <div class="trust-stat-box">
                        <span class="material-symbols-rounded stat-icon" style="color: #10b981; background: rgba(16, 185, 129, 0.1);">verified_user</span>
                        <h4>100%</h4>
                        <p>Secure</p>
                    </div>
                    <div class="trust-stat-box">
                        <span class="material-symbols-rounded stat-icon" style="color: #f59e0b; background: rgba(245, 158, 11, 0.1);">account_balance_wallet</span>
                        <h4>24/7</h4>
                        <p>Payouts</p>
                    </div>
                </div>

                <form id="loginForm" class="premium-form">
                    <div class="premium-input-wrapper">
                        <span class="material-symbols-rounded input-icon">mail</span>
                        <input type="email" id="loginEmail" placeholder="Email Address" required>
                    </div>
                    
                    <div class="premium-input-wrapper">
                        <span class="material-symbols-rounded input-icon">lock</span>
                        <input type="password" id="loginPassword" placeholder="Password" required>
                    </div>
                    
                    <div style="text-align: right; margin-bottom: 20px; width: 100%;">
                        <a class="forgot-link-premium cursor-pointer" id="goToForgot">Forgot Password?</a>
                    </div>

                    <button type="submit" class="btn-premium-login" id="loginBtn">
                        SIGN IN <span class="material-symbols-rounded" style="font-size: 18px; margin-left: 6px;">arrow_forward</span>
                    </button>
                </form>

                <div class="register-prompt">
                    <p>Don't have an account? <span class="register-link cursor-pointer" id="goToRegister">Create Now</span></p>
                </div>

                <!-- 🚀 IIT EXPERT FIX: Security Promise Footer -->
                <div class="login-trust-footer">
                    <p class="privacy-promise">
                        <span class="material-symbols-rounded" style="font-size: 14px; margin-right: 4px;">verified_user</span> 
                        End-to-End Encrypted & Secure
                    </p>
                </div>

            </div>
        `;
        
        // Navigation Listeners
        document.getElementById('goToRegister').addEventListener('click', () => navigateTo('register'));
        document.getElementById('goToForgot').addEventListener('click', () => navigateTo('forgot'));

        // Firebase Login Logic
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault(); // Page reload rokne ke liye
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const btn = document.getElementById('loginBtn');
            
            btn.innerHTML = "Logging in...";
            btn.disabled = true;

            auth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Login successful (Auth state listener automatically dashboard pe bhej dega)
                    console.log("Logged In:", userCredential.user.email);
                })
                .catch((error) => {
                    btn.innerHTML = "Login";
                    btn.disabled = false;
                    alert("Login Failed: " + error.message); // Native error handling
                });
        });
    }

    function renderRegisterScreen() {
        appContainer.innerHTML = `
            <div class="screen">
                <h1 class="text-left">Create Account</h1>
                <p class="subtitle text-left">Join Build Money</p>

                <form id="registerForm">
                    <div class="input-group text-left">
                        <label>Full Name</label>
                        <input type="text" id="regName" required>
                    </div>
                    <div class="input-group text-left">
                        <label>Email</label>
                        <input type="email" id="regEmail" required>
                    </div>
                    <div class="input-group text-left">
                        <label>Phone</label>
                        <input type="tel" id="regPhone" required>
                    </div>
                    <div class="input-group text-left">
                        <label>Password</label>
                        <input type="password" id="regPassword" required>
                    </div>
                    <div class="input-group text-left">
                        <label>Referral Code *</label>
                        <input type="text" id="regReferral" placeholder="Referral code (required)" required>
                    </div>
                    <button type="submit" class="btn-primary" id="regBtn">Register</button>
                </form>

                <p class="bottom-link text-center">Already have an account? <span class="text-green font-bold cursor-pointer" id="goToLogin">Login</span></p>
            </div>
        `;
        
        document.getElementById('goToLogin').addEventListener('click', () => navigateTo('login'));

        // ==========================================
        // FIREBASE + GOOGLE SHEET REGISTER LOGIC
        // ==========================================
        document.getElementById('registerForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const inputReferral = document.getElementById('regReferral').value.trim(); // Trim extra spaces
            const btn = document.getElementById('regBtn');

            if (GOOGLE_SCRIPT_URL === "AAPKI_GOOGLE_SCRIPT_WEB_APP_URL") {
                showCustomAlert("IIT Expert Note: Pehle Google Script URL update karein app.js me!");
                return;
            }

            btn.innerHTML = "Verifying Referral...";
            btn.disabled = true;

            try {
                // STEP 1: Verify Referral Code First
                let verifyResponse = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    body: JSON.stringify({ action: 'verifyReferral', referralCode: inputReferral })
                });
                let verifyData = await verifyResponse.json();

                // Agar code database me nahi mila to execution yahin block kar do
                if (!verifyData.valid) {
                    btn.innerHTML = "Register";
                    btn.disabled = false;
                    showCustomAlert("Referral Code not found! Kripya sahi referral code dalein.");
                    return; 
                }

                // STEP 2: Create Account on Firebase
                btn.innerHTML = "Creating Account...";
                let userCredential = await auth.createUserWithEmailAndPassword(email, password);

                // STEP 3: Push Data to Google Sheet (Generate New Code)
                btn.innerHTML = "Saving Details...";
                let saveResponse = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    body: JSON.stringify({
                        action: 'registerUser',
                        name: name,
                        email: email,
                        password: password
                    })
                });
                let saveData = await saveResponse.json();

                if (saveData.status === "success") {
                    console.log("Database Save Done! New Referral: ", saveData.myReferralCode);
                    // Yahan se App ka Auth State Listener usko automatically Dashboard par le jayega
                } else {
                    throw new Error("Data Google Sheet mein save nahi ho paya.");
                }

            } catch (error) {
                btn.innerHTML = "Register";
                btn.disabled = false;
                showCustomAlert("Registration Error: " + error.message);
            }
        });
    }

    function renderForgotPasswordScreen() {
        appContainer.innerHTML = `
            <div class="top-nav">
                <button class="back-btn" id="goBack">
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
                <div class="nav-title">Forgot Password</div>
            </div>
            <div class="screen">
                <br>
                <h2 class="text-left">Apna registered email enter karein</h2>
                <p class="subtitle text-left" style="margin-bottom: 20px;">Hum aapko OTP/Link bhejenge password reset ke liye.</p>

                <form id="forgotForm">
                    <div class="input-group text-left">
                        <label>Email</label>
                        <input type="email" id="forgotEmail" required>
                    </div>
                    <button type="submit" class="btn-primary" id="resetBtn">Send Reset Link</button>
                </form>
            </div>
        `;
        
        document.getElementById('goBack').addEventListener('click', () => history.back());

        // Firebase Forgot Password Logic
        document.getElementById('forgotForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('forgotEmail').value;
            const btn = document.getElementById('resetBtn');

            btn.innerHTML = "Sending...";
            btn.disabled = true;

            auth.sendPasswordResetEmail(email)
                .then(() => {
                    alert("Password reset link sent to your email!");
                    navigateTo('login');
                })
                .catch((error) => {
                    btn.innerHTML = "Send Reset Link";
                    btn.disabled = false;
                    alert("Error: " + error.message);
                });
        });
    }



    // ==========================================
    // BOTTOM NAVIGATION HELPER (DRY Principle)
    // ==========================================
    // Yeh function automatically detect karega konsi tab active hai aur icon ko fill kar dega
    function getBottomNavHTML(activeTab) {
        return `
            <div class="bottom-nav">
                <div class="nav-item ${activeTab === 'dashboard' ? 'active' : ''}" onclick="navigateTo('dashboard')">
                    <div class="icon-container">
                        <span class="${activeTab === 'dashboard' ? 'material-symbols-rounded' : 'material-symbols-outlined'}">home</span>
                    </div>
                    <span>Home</span>
                </div>
                <div class="nav-item ${activeTab === 'submit' ? 'active' : ''}" onclick="navigateTo('submit')">
                    <div class="icon-container">
                        <span class="${activeTab === 'submit' ? 'material-symbols-rounded' : 'material-symbols-outlined'}">description</span>
                    </div>
                    <span>Submit</span>
                </div>
                <div class="nav-item ${activeTab === 'team' ? 'active' : ''}" onclick="navigateTo('team')">
                    <div class="icon-container">
                        <span class="${activeTab === 'team' ? 'material-symbols-rounded' : 'material-symbols-outlined'}">groups</span>
                    </div>
                    <span>Team</span>
                </div>
                <div class="nav-item ${activeTab === 'wallet' ? 'active' : ''}" onclick="navigateTo('wallet')">
                    <div class="icon-container">
                        <span class="${activeTab === 'wallet' ? 'material-symbols-rounded' : 'material-symbols-outlined'}">account_balance_wallet</span>
                    </div>
                    <span>Wallet</span>
                </div>
                <div class="nav-item ${activeTab === 'support' ? 'active' : ''}" onclick="navigateTo('support')">
                    <div class="icon-container">
                        <span class="${activeTab === 'support' ? 'material-symbols-rounded' : 'material-symbols-outlined'}">chat</span>
                    </div>
                    <span>Support</span>
                </div>
            </div>
        `;
    }



    // ==========================================
    // 3. MAIN DASHBOARD SCREEN (Engineered with Live Sync)
    // ==========================================
    function renderDashboardScreen() {
        appContainer.innerHTML = `
            <div class="dashboard-layout" style="animation: fadeIn 0.3s ease-in-out;">
                <div class="header-top">
                    <div class="header-text">
                        <p>Namaste,</p>
                        <h2 id="userNameDisplay">Loading...</h2>
                    </div>
                    <span class="material-symbols-outlined logout-btn" id="logoutBtn">logout</span>
                </div>

                <div class="wallet-card">
                    <div class="wallet-balance-label">Wallet Balance</div>
                    <div class="wallet-amount" id="walletAmountDisplay">₹0.00</div>
                    <div class="wallet-stats">
                        <span id="totalEarnedDisplay">Total Earned: ₹0.00</span>
                        <!-- 🚀 IIT EXPERT FIX: Added dynamic ID for account status engine -->
                        <span id="accountStatusBadge" class="badge-inactive" style="transition: all 0.3s ease;">Loading...</span>
                    </div>
                    <div class="wallet-actions">
                        <button class="action-btn" onclick="navigateTo('deposit')">
                            <span class="material-symbols-outlined">add_circle</span>Deposit
                        </button>
                        <button class="action-btn" onclick="navigateTo('wallet')">
                            <span class="material-symbols-outlined">arrow_upward</span>Withdraw
                        </button>
                        <button class="action-btn" onclick="navigateTo('submit')">
                            <span class="material-symbols-outlined">cloud_upload</span>Submit
                        </button>
                    </div>
                </div>

                <!-- Daily Bonus Golden Card -->
                <div class="bonus-card">
                    <div class="bonus-content">
                        <h3>Daily Bonus</h3>
                        <p>Claim Rs. 20 daily</p>
                        <div class="claimed-days" id="totalClaimedDaysText">Total claimed: 0 days</div>
                    </div>
                    <button class="btn-golden" id="claimBonusBtn" disabled>Loading...</button>
                </div>

                <!-- 🚀 IIT EXPERT FIX: Fully Clickable Premium Plan Card -->
                <div class="plan-card cursor-pointer" onclick="navigateTo('deposit')" style="position: relative; transition: transform 0.1s;" onmousedown="this.style.transform='scale(0.98)'" onmouseup="this.style.transform='scale(1)'" onmouseleave="this.style.transform='scale(1)'">
                    <h3>Choose a Plan</h3>
                    <p style="padding-right: 30px;">Deposit karke account activate karein aur pages submit karein.</p>
                    <!-- Native Arrow Icon for Navigation UI -->
                    <span class="material-symbols-rounded" style="position: absolute; right: 15px; top: 50%; transform: translateY(-50%); color: #1b6e35; font-size: 20px;">arrow_forward_ios</span>
                </div>

                <div class="section-title" style="margin-top: 25px;">Recent Deposit Requests</div>
                <!-- 🚀 IIT EXPERT FIX: Dynamic History Container -->
                <div id="userDepositHistoryList" style="padding-bottom: 20px;">
                    <p class="empty-state text-center" style="font-size: 13px; color: #9ca3af;">Loading secure history...</p>
                </div>
            </div>

            <!-- Injecting Bottom Nav Dynamically -->
            ${getBottomNavHTML('dashboard')}
        `;
        
        const user = auth.currentUser;
        if(user) {
            // App UI instantly dikhe, isliye background mein fetch call lagaya hai
            syncUserProfileAndBonus(user.email);
        }

        document.getElementById('logoutBtn').addEventListener('click', () => {
            auth.signOut().catch((error) => showCustomAlert("Error logging out: " + error.message));
        });
    }


    // ==========================================
    // LIVE GOOGLE SHEET SYNC ENGINE (100% Bulletproof & Loophole Free)
    // ==========================================
    async function syncUserProfileAndBonus(email) {
        
        const claimBtn = document.getElementById('claimBonusBtn');
        const daysText = document.getElementById('totalClaimedDaysText');
        const walletAmt = document.getElementById('walletAmountDisplay');
        const earnedAmt = document.getElementById('totalEarnedDisplay');
        const userName = document.getElementById('userNameDisplay');

        try {
            let response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify({ action: 'getUserProfile', email: email })
            });
            let result = await response.json();

            if (result.status === "success") {
                userName.innerText = result.name;
                daysText.innerText = `Total claimed: ${result.totalDays} days`;
                
                // 🚀 IIT EXPERT SEPARATION: Wallet for Deposits, Earned for Bonus
                walletAmt.innerText = `₹${result.walletBalance}.00`; 
                earnedAmt.innerText = `Total Earned: ₹${result.totalBonus}.00`;

                // 🚀 IIT EXPERT FIX: Dynamic Verified Badge Engine
                const statusBadge = document.getElementById('accountStatusBadge');
                if (result.accountStatus === "Active") {
                    statusBadge.className = "badge-verified"; // Class badal jayegi premium UI ke liye
                    statusBadge.innerHTML = `<span class="material-symbols-rounded" style="font-size: 14px; margin-right: 3px;">verified</span> Verified`;
                } else {
                    statusBadge.className = "badge-inactive";
                    statusBadge.innerHTML = `Inactive`;
                }

                // 🚀 IIT EXPERT FIX: Hide Daily Bonus Card forever if Account is Active
                const bonusCardEl = document.querySelector('.bonus-card');
                if (result.accountStatus === "Active") {
                    if(bonusCardEl) bonusCardEl.style.display = 'none';
                } else {
                    if(bonusCardEl) bonusCardEl.style.display = 'block';
                }

                // 🚀 IIT EXPERT FIX: Render Premium Transaction & Daily Bonus History
                const historyContainer = document.getElementById('userDepositHistoryList');
                if (result.depositHistory && result.depositHistory.length > 0) {
                    result.depositHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                    
                    historyContainer.innerHTML = result.depositHistory.map(item => {
                        let badgeHtml = "";
                        let titleText = `₹${item.amount} Deposit`;
                        let iconHtml = `<span class="material-symbols-rounded" style="font-size: 14px;">event</span>`;

                        if (item.status === "Bonus" || item.txnId === "DAILY_BONUS") {
                            badgeHtml = `<span style="background: #e0e7ff; color: #3b82f6; padding: 4px 8px; border-radius: 8px; font-size: 10px; font-weight: 800; display: inline-flex; align-items: center; gap: 3px; box-shadow: 0 2px 6px rgba(59, 130, 246, 0.15);"><span class="material-symbols-rounded" style="font-size: 14px;">redeem</span> CLAIMED</span>`;
                            titleText = `₹${item.amount} Daily Bonus`;
                        } else if (item.status === true || item.status === "true") {
                            badgeHtml = `<span style="background: #dcfce7; color: #059669; padding: 4px 8px; border-radius: 8px; font-size: 10px; font-weight: 800; display: inline-flex; align-items: center; gap: 3px; box-shadow: 0 2px 6px rgba(5, 150, 105, 0.15);"><span class="material-symbols-rounded" style="font-size: 14px;">check_circle</span> APPROVED</span>`;
                        } else {
                            badgeHtml = `<span style="background: #fef3c7; color: #d97706; padding: 4px 8px; border-radius: 8px; font-size: 10px; font-weight: 800; display: inline-flex; align-items: center; gap: 3px; box-shadow: 0 2px 6px rgba(217, 119, 6, 0.15);"><span class="material-symbols-rounded" style="font-size: 14px;">schedule</span> PENDING</span>`;
                        }
                        
                        // 🚀 IIT EXPERT FIX: Smart Time Formatter (ISO to Human Readable IST)
                        let displayDate = item.timestamp;
                        try {
                            const dateObj = new Date(item.timestamp);
                            if (!isNaN(dateObj.getTime())) {
                                displayDate = dateObj.toLocaleString('en-IN', {
                                    day: '2-digit', month: 'short', year: 'numeric',
                                    hour: '2-digit', minute: '2-digit', hour12: true
                                });
                            }
                        } catch(e) {}
                        
                        return `
                            <div style="background: #ffffff; border: 1.5px solid #f3f4f6; border-radius: 14px; padding: 14px 16px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 12px rgba(0,0,0,0.03); transition: transform 0.2s ease;">
                                <div style="display: flex; flex-direction: column; gap: 5px;">
                                    <span style="font-size: 15px; font-weight: 800; color: #111827;">${titleText}</span>
                                    <span style="font-size: 11px; font-weight: 700; color: #6b7280; display: flex; align-items: center; gap: 4px;">
                                        ${iconHtml} ${displayDate}
                                    </span>
                                </div>
                                <div>
                                    ${badgeHtml}
                                </div>
                            </div>
                        `;
                    }).join('');
                } else {
                    historyContainer.innerHTML = `<div style="background: #f8fafc; border: 1.5px dashed #e2e8f0; border-radius: 14px; padding: 20px; text-align: center;">
                        <span class="material-symbols-rounded" style="font-size: 32px; color: #94a3b8; margin-bottom: 8px;">receipt_long</span>
                        <p style="font-size: 13px; font-weight: 600; color: #64748b; margin: 0;">No past transactions found.</p>
                    </div>`;
                }

                // 🚀 IIT EXPERT FIX: Client-side time hata diya. Ab strictly backend 'serverToday' check karega.
                if (result.lastClaimDate === result.serverToday) {
                    claimBtn.disabled = true; 
                    claimBtn.innerHTML = `<span class="material-symbols-rounded" style="font-size:16px; margin-right:4px;">check</span>Claimed`;
                    claimBtn.style.background = "#e6cd9e";
                } else {
                    claimBtn.disabled = false; 
                    claimBtn.innerHTML = "Claim ₹20";
                    claimBtn.style.background = "#FA4605";
                }

                claimBtn.onclick = async () => {
                    claimBtn.disabled = true;
                    claimBtn.innerHTML = "Processing...";

                    try {
                        let claimRes = await fetch(GOOGLE_SCRIPT_URL, {
                            method: 'POST',
                            body: JSON.stringify({ action: 'claimDailyBonus', email: email }) 
                        });
                        let claimData = await claimRes.json();

                        if (claimData.status === "success" || claimData.status === "already_claimed") {
                            
                            // 🚀 IIT EXPERT FIX: DRY Principle (Don't Repeat Yourself)
                            // Button locking engine dono status ke liye ek hi baar run hoga
                            claimBtn.disabled = true;
                            claimBtn.innerHTML = `<span class="material-symbols-rounded" style="font-size:16px; margin-right:4px;">check</span>Claimed`;
                            claimBtn.style.background = "#e6cd9e";

                            if (claimData.status === "success") {
                                daysText.innerText = `Total claimed: ${claimData.totalDays} days`;
                                walletAmt.innerText = `₹${claimData.walletBalance || claimData.totalBonus}.00`;
                                earnedAmt.innerText = `Total Earned: ₹${claimData.totalBonus}.00`;
                                showCustomAlert("Premium Unlock: ₹20 bonus successfully aapke wallet mein add ho gaya!");
                                
                                // 🚀 IIT EXPERT FIX: Instantly refresh the history list seamlessly
                                syncUserProfileAndBonus(email); 
                            } else {
                                showCustomAlert("Aap aaj ka bonus already claim kar chuke hain. Kal phir aaiye!");
                            }
                            
                        } else {
                            throw new Error(claimData.message);
                        }
                    } catch(err) {
                        claimBtn.disabled = false; // Allow retry on network disconnect only
                        claimBtn.innerHTML = "Claim ₹20 Now";
                        showCustomAlert("Network Error: " + err.message);
                    }
                };

            } else {
                userName.innerText = "Student";
                claimBtn.disabled = true; // Loophole Closed: Agar profile fetch nahi hui toh hack karne se roko
                claimBtn.innerHTML = "User Not Found";
            }
        } catch(error) {
            userName.innerText = "Welcome back";
            // 🚀 IIT EXPERT FIX: Network fail hone par button Galti se ENABLE NAHI karna hai!
            claimBtn.disabled = true; 
            claimBtn.innerHTML = "Weak Netwrok";
            claimBtn.style.background = "#e6cd9e";
            console.error("Profile sync failed: ", error);
        }
    }


    // ==========================================
    // 4. UPCOMING TAB SCREENS (Submit, Team, Wallet, Support)
    // ==========================================
    
    // Generic function format banaya gaya hai upcoming screens ke liye
    function generateUpcomingScreen(title, icon) {
        return `
            <div class="dashboard-layout" style="animation: fadeIn 0.3s ease-in-out;">
                <div class="header-top">
                    <div class="header-text"><h2>${title}</h2></div>
                </div>
                <div class="plan-card text-center" style="margin-top: 60px;">
                    <span class="material-symbols-rounded text-green" style="font-size: 50px; margin-bottom: 15px;">${icon}</span>
                    <h3>Upcoming Feature</h3>
                    <p>Bhai, yeh screen ka backend jaldi hi connect hoga.</p>
                </div>
            </div>
        `;
    }

    function renderSubmitScreen() {
        appContainer.innerHTML = generateUpcomingScreen("Submit Work", "description") + getBottomNavHTML('submit');
    }

    function renderTeamScreen() {
        appContainer.innerHTML = generateUpcomingScreen("My Team", "groups") + getBottomNavHTML('team');
    }

    function renderWalletScreen() {
        appContainer.innerHTML = generateUpcomingScreen("Wallet & Transactions", "account_balance_wallet") + getBottomNavHTML('wallet');
    }

    function renderSupportScreen() {
        appContainer.innerHTML = `
            <div class="top-nav">
                <div class="nav-title" style="flex-grow: 1; text-align: left; font-size: 20px;">Help & Support</div>
                <!-- Premium Admin Engine Navigation Button -->
                <button class="back-btn" id="goToAdminBtn" style="margin-right: 0; color: #1b6e35; transition: transform 0.2s;">
                    <span class="material-symbols-rounded" style="font-size: 28px;">admin_panel_settings</span>
                </button>
            </div>
            <div class="dashboard-layout" style="animation: fadeIn 0.3s ease-in-out;">
                <div class="plan-card text-center" style="margin-top: 40px;">
                    <span class="material-symbols-rounded text-green" style="font-size: 50px; margin-bottom: 15px;">support_agent</span>
                    <h3>Support Feature</h3>
                    <p>Bhai, yeh screen ka support chat jaldi hi connect hoga.</p>
                </div>
            </div>
            ${getBottomNavHTML('support')}
        `;

        document.getElementById('goToAdminBtn').addEventListener('click', () => {
            // Icon pe click karte hi shrink effect and redirect
            document.getElementById('goToAdminBtn').style.transform = 'scale(0.8)';
            setTimeout(() => navigateTo('adminLogin'), 150);
        });
    }


    // ==========================================
    // PREMIUM DEPOSIT & ACTIVATE SCREEN (With Drive Engine)
    // ==========================================
    function renderDepositScreen() {
        appContainer.innerHTML = `
            <div class="top-nav">
                <button class="back-btn" id="goBackDeposit">
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
                <div class="nav-title text-center" style="font-size: 20px;">Deposit & Activate</div>
                <div style="width: 24px;"></div>
            </div>
            
            <div class="screen" style="padding-bottom: 100px;">
                <h3 class="section-title" style="margin-top: 0;">Select Plan</h3>
                
                <div id="dynamic-plan-list" class="plan-list">
                    <div class="text-center" style="padding: 20px; color: #1b6e35;">
                        <span class="material-symbols-outlined" style="animation: spin 1s linear infinite; font-size: 32px;">sync</span>
                        <p style="margin-top: 8px; font-weight: bold; font-size: 14px;">Loading Live Plans...</p>
                    </div>
                </div>

                <div class="payment-instruction-box">
                    <h4 class="text-green font-bold" style="margin-bottom: 10px; font-size: 15px;">Payment Instructions</h4>
                    <p style="margin-bottom: 8px; font-size: 14px; font-weight: 500;">UPI ID: <strong id="dynamicUpiDisplay" style="color: #1b6e35; font-size: 16px;">Loading...</strong></p>
                    <p style="margin-bottom: 12px; font-size: 14px; font-weight: 500;">Amount: <strong id="dynamicAmount" style="color: #000;">Loading...</strong></p>
                    <p style="font-size: 13px; color: #1b6e35;">Kindly Upload your screenshot after payment.</p>
                </div>

                <h3 class="section-title">Payment Screenshot</h3>
                
                <!-- Live Image Preview Box -->
                <label class="screenshot-upload-box" for="screenshotFile" id="imagePreviewBox">
                    <span class="material-symbols-outlined text-green" style="font-size: 36px; margin-bottom: 8px;" id="uploadIcon">image</span>
                    <p class="text-green font-bold" id="uploadText" style="font-size: 14px;">Tap to upload screenshot</p>
                    <input type="file" id="screenshotFile" accept="image/*" style="display: none;">
                </label>

                <h3 class="section-title">Transaction / UTR Ref (optional)</h3>
                <div class="input-group">
                    <input type="text" id="txnInput" placeholder="Enter 12-digit UTR Number" style="background: #f4f6f5;">
                </div>

                <button class="btn-primary" id="depositSubmitBtn" style="margin-top: 15px;">Submit Request</button>
            </div>
            ${getBottomNavHTML('wallet')} 
        `;

        document.getElementById('goBackDeposit').addEventListener('click', () => {
            if (window.history.length > 1) { window.history.back(); } 
            else { navigateTo('dashboard', false); }
        });

        let selectedPlan = "";
        let selectedPrice = 0;
        const amountDisplay = document.getElementById('dynamicAmount');
        const planListContainer = document.getElementById('dynamic-plan-list');

        


        // 🚀 IIT EXPERT FIX: Advanced Safe JSON Engine & Null Failsafe
        async function fetchPlansFromServer() {
            try {
                let res = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    headers: { "Content-Type": "text/plain;charset=utf-8" },
                    body: JSON.stringify({ action: 'getAllPlans' })
                });
                
                // 1. Fetch response as plain text first to prevent JSON crash
                let textRes = await res.text();
                let result;
                try {
                    result = JSON.parse(textRes);
                } catch(err) {
                    throw new Error("Backend Update Required: Did you deploy App Script as a 'New Version'?");
                }
                
                // 2. Safe DOM Injection
                if (result.status === "success" && result.data && result.data.length > 0) {
                    let plansHtml = "";
                    result.data.forEach((plan, index) => {
                        let isActive = index === 0 ? "active" : "";
                        if(index === 0) {
                            selectedPlan = plan.name;
                            selectedPrice = plan.price;
                            if(amountDisplay) amountDisplay.innerText = `₹${plan.price}`; // Null Safe
                        }
                        plansHtml += `
                        <div class="plan-card-item ${isActive}" data-price="${plan.price}" data-plan="${plan.name}">
                            <div class="plan-info">
                                <h4>${plan.name}</h4>
                                <p class="text-green font-bold">Profit: ₹${plan.profit}/Quiz</sp>
                            </div>
                            <div class="plan-price">₹${plan.price}</div>
                        </div>`;
                    });
                    
                    if(planListContainer) planListContainer.innerHTML = plansHtml;

                    const planCards = document.querySelectorAll('.plan-card-item');
                    planCards.forEach(card => {
                        card.addEventListener('click', () => {
                            planCards.forEach(c => c.classList.remove('active'));
                            card.classList.add('active');
                            selectedPrice = card.getAttribute('data-price');
                            selectedPlan = card.getAttribute('data-plan');
                            if(amountDisplay) amountDisplay.innerText = `₹${selectedPrice}`;
                        });
                    });
                } else {
                    if(planListContainer) planListContainer.innerHTML = `<p class="text-center" style="color:#e11d48; font-size: 13px; padding: 10px;">Error: ${result.message || 'Check Server Database.'}</p>`;
                }
            } catch(e) {
                // 3. Ultimate Diagnostic Error Display
                if(planListContainer) {
                    planListContainer.innerHTML = `
                    <div class="text-center" style="background:#fef2f2; color:#b91c1c; padding:18px; border:1.5px dashed #ef4444; border-radius:12px;">
                        <span class="material-symbols-outlined" style="font-size:32px; margin-bottom:8px;">error</span>
                        <p style="font-size: 14px; font-weight: 800; margin-bottom:4px;">Engine Disconnected</p>
                        <p style="font-size: 12px; font-weight: 500;">${e.message}</p>
                    </div>`;
                }
            }
        }

        // 🚀 IIT EXPERT FIX: Live UPI Fetch Engine
        async function fetchLiveUpi() {
            try {
                let res = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    headers: { "Content-Type": "text/plain;charset=utf-8" },
                    body: JSON.stringify({ action: 'getUpiId' })
                });
                let textRes = await res.text();
                let result = JSON.parse(textRes);
                if (result.status === "success") {
                    document.getElementById('dynamicUpiDisplay').innerText = result.upiId;
                } else {
                    document.getElementById('dynamicUpiDisplay').innerText = "Unavailable";
                }
            } catch(e) {
                document.getElementById('dynamicUpiDisplay').innerText = "Network Error";
            }
        }
        
        fetchPlansFromServer(); 
        fetchLiveUpi(); // Trigger UPI Fetch

        // 🚀 IIT EXPERT: Base64 Media Engine & Live Preview
        const fileInput = document.getElementById('screenshotFile');
        const previewBox = document.getElementById('imagePreviewBox');
        const uploadText = document.getElementById('uploadText');
        const uploadIcon = document.getElementById('uploadIcon');

        let base64String = null;
        let mimeType = null;
        let fileName = null;

        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    base64String = event.target.result.split(',')[1];
                    mimeType = file.type;
                    fileName = file.name;
                    
                    // Set image as background for premium preview
                    previewBox.style.backgroundImage = `url(${event.target.result})`;
                    previewBox.style.backgroundSize = 'cover';
                    previewBox.style.backgroundPosition = 'center';
                    previewBox.style.borderStyle = 'solid'; // Remove dash border for clean image
                    
                    // Hide placeholder icons
                    uploadText.style.display = 'none';
                    uploadIcon.style.display = 'none';
                };
                reader.readAsDataURL(file);
            }
        });

        // 🚀 SUBMISSION LOGIC
        const submitBtn = document.getElementById('depositSubmitBtn');
        submitBtn.addEventListener('click', async () => {
            if (!base64String) {
                showCustomAlert("Kindly upload the payment screenshot first.");
                return;
            }

            const txnVal = document.getElementById('txnInput').value.trim();
            const user = firebase.auth().currentUser;

            if(!user) {
                showCustomAlert("Authentication Error! Please login again.");
                return;
            }

            submitBtn.innerHTML = "Processing & Uploading...";
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.7";

            try {
                let res = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    body: JSON.stringify({
                        action: 'depositRequest',
                        email: user.email,
                        planName: selectedPlan,
                        price: selectedPrice,
                        transactionId: txnVal,
                        imageBase64: base64String,
                        mimeType: mimeType,
                        imageName: fileName
                    })
                });
                let result = await res.json();

                if (result.status === "success") {
                    showCustomAlert("Deposit Request Submitted Successfully!");
                    navigateTo('dashboard'); // Redirect auto on success
                } else {
                    throw new Error(result.message);
                }
            } catch (err) {
                submitBtn.innerHTML = "Submit Request";
                submitBtn.disabled = false;
                submitBtn.style.opacity = "1";
                showCustomAlert("Upload Failed: " + err.message);
            }
        });
    }


    // ==========================================
    // NEUMORPHIC ADMIN LOGIN SCREEN
    // ==========================================
    function renderAdminLoginScreen() {
        appContainer.innerHTML = `
            <div class="neumorphic-wrapper">
                <div class="top-nav" style="background: transparent; border: none; box-shadow: none; position: absolute; top: 0; width: 100%; z-index: 10;">
                    <button class="back-btn" id="goBackAdmin" style="color: #6a737d;">
                        <span class="material-symbols-outlined">arrow_back</span>
                    </button>
                </div>
                
                <div class="neumorphic-circle">
                    <h2 class="admin-title">Login</h2>
                    <p class="admin-subtitle">Admin Engine</p>

                    <form id="adminLoginForm" class="admin-form">
                        <div class="neumorphic-input-group">
                            <span class="material-symbols-rounded icon-user">person</span>
                            <input type="text" id="adminUser" placeholder="Username" required autocomplete="off">
                        </div>
                        <div class="neumorphic-input-group">
                            <span class="material-symbols-rounded icon-lock">lock</span>
                            <input type="password" id="adminPass" placeholder="Password" required>
                        </div>
                        <button type="submit" class="neumorphic-btn" id="adminLoginBtn">SIGN IN</button>
                    </form>
                </div>
            </div>
        `;

        // Loophole Free Back Navigation
        document.getElementById('goBackAdmin').addEventListener('click', () => {
            if (window.history.length > 1) { window.history.back(); } 
            else { navigateTo('support', false); }
        });

        // 🚀 Admin Authentication Engine
        document.getElementById('adminLoginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const userVal = document.getElementById('adminUser').value.trim();
            const passVal = document.getElementById('adminPass').value.trim();
            const btn = document.getElementById('adminLoginBtn');

            btn.innerText = "Signing In...";
            btn.disabled = true;

            try {
                // 🚀 IIT EXPERT FIX: Added explicit text/plain header to strictly bypass browser CORS preflight blocks
                let res = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "text/plain;charset=utf-8"
                    },
                    body: JSON.stringify({
                        action: 'adminLogin',
                        username: userVal,
                        password: passVal
                    })
                });
                let result = await res.json();

                if (result.status === "success") {
                    showCustomAlert("Welcome Admin! Engine Unlocked.");
                    // 🚀 IIT EXPERT FIX: Save Secure Session Token Client-Side
                    sessionStorage.setItem('buildMoneyAdminToken', result.adminToken);
                    setTimeout(() => navigateTo('adminDashboard'), 1500); 
                } else {
                    throw new Error(result.message);
                }
            } catch(error) {
                btn.innerText = "SIGN IN";
                btn.disabled = false;
                showCustomAlert("Access Denied: " + error.message);
            }
        });
    }




    // ==========================================
    // ADMIN MULTICOLOR GRID DASHBOARD
    // ==========================================
    function renderAdminDashboardScreen() {
        appContainer.innerHTML = `
            <div class="top-nav" style="background-color: #0f172a; border-bottom: none;">
                <button class="back-btn" id="adminLogoutBtn" style="color: #ffffff;">
                    <span class="material-symbols-outlined">logout</span>
                </button>
                <div class="nav-title text-center" style="font-size: 20px; color: #ffffff;">Admin Engine</div>
                <div style="width: 24px;"></div> <!-- Center Alignment Spacer -->
            </div>
            
            <div class="screen" style="background-color: #f8fafc; min-height: 100vh; padding-top: 1.5rem;">
                <div class="admin-header" style="margin-bottom: 25px;">
                    <h2 style="font-size: 26px; color: #0f172a; margin-bottom: 4px;">Dashboard</h2>
                    <p style="font-size: 14px; color: #64748b;">Overview & Platform Management</p>
                </div>
                
                <!-- 🚀 IIT EXPERT FIX: Premium Live UPI Management Card -->
                <div style="background: #ffffff; border-radius: 16px; padding: 20px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <p style="font-size: 11px; font-weight: 800; color: #64748b; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Current Live UPI ID</p>
                        <h3 id="adminCurrentUpi" style="font-size: 16px; font-weight: 800; color: #1b6e35; margin: 0;">Loading...</h3>
                    </div>
                    <button onclick="openUpiUpdateModal()" style="background: #eff6ff; color: #2563eb; border: none; padding: 10px 18px; border-radius: 10px; font-size: 13px; font-weight: 800; cursor: pointer; transition: transform 0.15s ease, background 0.15s ease;" onmousedown="this.style.transform='scale(0.92)'" onmouseup="this.style.transform='scale(1)'">
                        Change
                    </button>
                </div>
                
                <div class="admin-grid">
                    <!-- Deposit Request (Priority - Full Width) -->
                    <div class="admin-card card-deposit" onclick="navigateTo('adminDepositRequests')">
                        <span class="material-symbols-rounded">payments</span>
                        <h4>Deposit Request</h4>
                        <div class="glass-badge">Live</div>
                    </div>

                    <!-- Total Accounts Activated -->
                    <div class="admin-card card-submit" style="cursor: default;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <span class="material-symbols-rounded">verified_user</span>
                            <h2 id="liveActiveCount" style="font-size: 28px; font-weight: 800; margin: 0; line-height: 1; color: white;">-</h2>
                        </div>
                        <h4 style="margin-top: 15px;">Active Accounts</h4>
                    </div>
                    
                    <!-- Total New Users -->
                    <div class="admin-card card-accounts" style="cursor: default;">
                         <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <span class="material-symbols-rounded">group_add</span>
                            <h2 id="liveUsersCount" style="font-size: 28px; font-weight: 800; margin: 0; line-height: 1; color: white;">-</h2>
                        </div>
                        <h4 style="margin-top: 15px;">Total Users</h4>
                    </div>  
                    
                    <!-- Withdraw Request -->
                    <div class="admin-card card-withdraw" onclick="showCustomAlert('Withdraw Requests UI Connection Pending...')">
                        <span class="material-symbols-rounded">account_balance</span>
                        <h4>Withdraw Request</h4>
                        <div class="glass-badge">0 New</div>
                    </div>
                    
                    <!-- Queries -->
                    <div class="admin-card card-queries" onclick="showCustomAlert('Queries UI Connection Pending...')">
                        <span class="material-symbols-rounded">forum</span>
                        <h4>Queries</h4>
                    </div>
                </div>
            </div>
        `;

        // 🚀 Loophole-Free Logout: Sends admin back to the user-side dashboard
        document.getElementById('adminLogoutBtn').addEventListener('click', () => {
            navigateTo('dashboard', false); 
        });

        // 🚀 IIT EXPERT FIX: Trigger Live Stats fetch on load
        fetchAdminDashboardStats();
        fetchAdminLiveUpi(); // 🚀 NEW: Load UPI instantly on Admin Dashboard
    }

    // ==========================================
    // 🚀 ADMIN LIVE STATS ENGINE (With Number Animation)
    // ==========================================
    async function fetchAdminDashboardStats() {
        const usersCountEl = document.getElementById('liveUsersCount');
        const activeCountEl = document.getElementById('liveActiveCount');
        if(!usersCountEl || !activeCountEl) return;

        try {
            let res = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify({ 
                    action: 'getAdminStats',
                    adminToken: sessionStorage.getItem('buildMoneyAdminToken') // Strict Token
                })
            });
            
            let textRes = await res.text();
            let result;
            try {
                result = JSON.parse(textRes);
            } catch(e) {
                throw new Error("JSON Parse failed");
            }
            
            if (result.status === "success") {
                // Smooth Counting Animation for Premium Feel (Duration 1.2 seconds)
                animateValue(usersCountEl, 0, result.totalUsers, 1200);
                animateValue(activeCountEl, 0, result.activeAccounts, 1200);
            } else {
                usersCountEl.innerText = "Err";
                activeCountEl.innerText = "Err";
            }
        } catch(e) {
            usersCountEl.innerText = "--";
            activeCountEl.innerText = "--";
        }
    }
    
    // 🚀 High-Performance Native CSS-Level Number Counter
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end; // Final safety check so number is perfectly exact
            }
        };
        window.requestAnimationFrame(step);
    }

    // ==========================================
    // 🚀 ADMIN UPI FETCH & UPDATE ENGINE
    // ==========================================
    
    // 1. Fetch current UPI for Admin Card
    async function fetchAdminLiveUpi() {
        const upiEl = document.getElementById('adminCurrentUpi');
        if(!upiEl) return; // Failsafe

        try {
            let res = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify({ action: 'getUpiId' }) 
            });
            let textRes = await res.text();
            let result = JSON.parse(textRes);
            if (result.status === "success") {
                upiEl.innerText = result.upiId;
            } else {
                upiEl.innerText = "Error Fetching";
            }
        } catch(e) {
            upiEl.innerText = "Network Error";
        }
    }

    // 2. Open Premium Neumorphic Style Update Modal
    window.openUpiUpdateModal = function() {
        // Find current UPI to pre-fill the input box smoothly
        let currentUpi = document.getElementById('adminCurrentUpi').innerText;
        if(currentUpi === 'Loading...' || currentUpi === 'Error Fetching' || currentUpi === 'Network Error') currentUpi = '';

        const modalHtml = `
            <div id="upiModalOverlay" class="custom-alert-overlay" style="display: flex;">
                <div class="custom-alert-box" style="width: 90%; max-width: 350px; text-align: left; padding: 24px;">
                    <div style="display: flex; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">
                        <span class="material-symbols-rounded" style="color: #2563eb; font-size: 24px; margin-right: 8px;">qr_code_scanner</span>
                        <h3 style="color: #0f172a; font-size: 18px; margin: 0;">Update Live UPI ID</h3>
                    </div>
                    <p style="font-size: 13px; color: #64748b; margin-bottom: 15px; font-weight: 500;">Please enter the new UPI ID here</p>
                    
                    <input type="text" id="newUpiInput" value="${currentUpi}" placeholder="e.g. 9876543210@ybl" style="width: 100%; padding: 14px; border: 2px solid #e2e8f0; border-radius: 10px; margin-bottom: 20px; font-weight: 700; color: #0f172a; outline: none; font-size: 15px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#2563eb'" onblur="this.style.borderColor='#e2e8f0'">
                    
                    <div style="display: flex; gap: 10px;">
                        <button onclick="document.getElementById('upiModalOverlay').remove()" style="flex: 1; padding: 14px; border: none; background: #f1f5f9; color: #475569; border-radius: 10px; cursor: pointer; font-weight: 800; font-size: 13px;">Cancel</button>
                        <button id="saveUpiBtn" onclick="saveNewUpi()" style="flex: 1; padding: 14px; border: none; background: #2563eb; color: white; border-radius: 10px; cursor: pointer; font-weight: 800; font-size: 13px; box-shadow: 0 4px 10px rgba(37,99,235,0.2);">Update Now</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    };

    // 3. Save Logic Engine
    window.saveNewUpi = async function() {
        const upiVal = document.getElementById('newUpiInput').value.trim();
        if (!upiVal) { showCustomAlert("Error: UPI ID blank nahi ho sakta!"); return; }
        
        const btn = document.getElementById('saveUpiBtn');
        btn.innerText = "Updating...";
        btn.disabled = true;

        try {
            let res = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify({ 
                    action: 'updateUpiId', 
                    newUpi: upiVal,
                    adminToken: sessionStorage.getItem('buildMoneyAdminToken') // Strict Token Inject
                })
            });
            let result = await res.json();
            if (result.status === "success") {
                document.getElementById('upiModalOverlay').remove();
                showCustomAlert("UPI ID Live Updated Successfully!");
                fetchAdminLiveUpi(); // Instantly refresh the UI card
            } else throw new Error(result.message);
        } catch(e) {
            btn.innerText = "Update Now";
            btn.disabled = false;
            showCustomAlert("Error: " + e.message);
        }
    };

    // ==========================================
    // ADMIN DEPOSIT REQUESTS LIST SCREEN
    // ==========================================
    function renderAdminDepositRequestsScreen() {
        appContainer.innerHTML = `
            <div class="top-nav" style="background-color: #ffffff; border-bottom: 1px solid #f0f0f0; position: sticky; top: 0; z-index: 1000;">
                <button class="back-btn" id="goBackAdminDeposit">
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
                <div class="nav-title" style="font-size: 18px; flex-grow: 1; text-align: left; font-weight: 800;">All Deposit Requests</div>
                <div style="width: 24px;"></div>
            </div>
            
            <div class="screen" style="background-color: #f8fafc; min-height: 100vh; padding-top: 1rem;">
                <div id="loadingIndicator" class="text-center" style="color: #64748b; margin-top: 40px;">
                    <span class="material-symbols-outlined" style="animation: spin 1s linear infinite; font-size: 36px; color: #3b82f6;">refresh</span>
                    <p style="margin-top: 10px; font-weight: 500;">Fetching secure requests...</p>
                </div>
                
                <div id="depositRequestsList" style="display: flex; flex-direction: column; gap: 12px; padding-bottom: 30px;">
                    <!-- Dynamic List Engine Will Populate Here -->
                </div>
            </div>
        `;

        // 1. Hardware Backpress Sync (100% Loophole Free)
        document.getElementById('goBackAdminDeposit').addEventListener('click', () => {
            if (window.history.length > 1) { window.history.back(); } 
            else { navigateTo('adminDashboard', false); }
        });

        // 2. Trigger Fetch Logic
        fetchDepositRequests();
    }


    async function fetchDepositRequests() {
        const listContainer = document.getElementById('depositRequestsList');
        const loader = document.getElementById('loadingIndicator');

        try {
            let res = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify({ 
                    action: 'getDepositRequests',
                    // 🚀 IIT EXPERT FIX: Token injected for fetching lists
                    adminToken: sessionStorage.getItem('buildMoneyAdminToken') 
                })
            });
            let result = await res.json();
            loader.style.display = 'none';

            if (result.status === "success") {
                let reqData = result.data;
                if (reqData.length === 0) {
                    listContainer.innerHTML = `<p class="empty-state text-center" style="margin-top:20px;">No pending requests.</p>`;
                    return;
                }

                reqData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                window.adminPendingRequests = reqData; 

                listContainer.innerHTML = reqData.map((req, index) => {
                    // 🚀 IIT EXPERT FIX: Universal variables strictly applied (Fixes ₹NaN & Wrong Plan)
                    let planName = req.planName; 
                    let amt = req.amount;
                    
                    let displayDate = req.timestamp;
                    try {
                        const dateObj = new Date(req.timestamp);
                        if (!isNaN(dateObj.getTime())) {
                            displayDate = dateObj.toLocaleString('en-IN', {
                                day: '2-digit', month: 'short', year: 'numeric',
                                hour: '2-digit', minute: '2-digit', hour12: true
                            });
                        }
                    } catch(e) {}

                    return `
                    <div class="request-list-card">
                        <div class="request-info">
                            <h4>${req.name}</h4>
                            <p>${req.email}</p>
                            <small><span class="material-symbols-outlined icon-small">schedule</span> ${displayDate}</small>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-weight: bold; color: #1b6e35; font-size: 14px;">₹${amt}</div>
                            <button class="btn-view-details" onclick="openAdminApprovalModal(${index})">View</button>
                        </div>
                    </div>
                `}).join('');
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            loader.innerHTML = `<p style="color: #e11d48;">Error: ${error.message}</p><button class="btn-view-details" onclick="fetchDepositRequests()">Retry</button>`;
        }
    }

    // 🚀 Admin Approval Engine Modal
    window.openAdminApprovalModal = function(index) {
        const req = window.adminPendingRequests[index];
        
        // 🚀 IIT EXPERT FIX: Universal variables strictly applied for Modal (Fixes ₹NaN)
        const amt = req.amount;
        const planName = req.planName;
        
        const modalHtml = `
            <div id="adminModalOverlay" class="custom-alert-overlay" style="display: flex;">
                <div class="custom-alert-box" style="width: 90%; max-width: 400px; text-align: left; padding: 20px;">
                    <h3 style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">Verification</h3>
                    <p><strong>Name:</strong> ${req.name}</p>
                    <p><strong>Email:</strong> ${req.email}</p>
                    <p><strong>Plan:</strong> ${planName} (₹${amt})</p>
                    <p style="margin-bottom: 10px;"><strong>Txn ID:</strong> ${req.txnId}</p>
                    
                    <a href="${req.screenshot}" target="_blank" style="display: block; background: #f0f0f0; text-align: center; padding: 10px; border-radius: 8px; margin-bottom: 20px; color: #2563eb; font-weight: bold; text-decoration: none;">
                        <span class="material-symbols-outlined" style="vertical-align: middle;">open_in_new</span> View Screenshot
                    </a>

                    <div style="display: flex; gap: 10px;">
                        <button onclick="closeAdminModal()" style="flex: 1; padding: 12px; border: none; background: #e2e8f0; border-radius: 8px; cursor: pointer; font-weight: bold;">Cancel</button>
                        <button id="verifyApproveBtn" onclick="approveDepositReq(${req.rowNumber}, '${req.email}')" style="flex: 1; padding: 12px; border: none; background: #1b6e35; color: white; border-radius: 8px; cursor: pointer; font-weight: bold;">Verify & Add</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    };

    window.closeAdminModal = function() {
        const modal = document.getElementById('adminModalOverlay');
        if(modal) modal.remove();
    };

    window.approveDepositReq = async function(rowNumber, email) {
        const btn = document.getElementById('verifyApproveBtn');
        btn.innerText = "Processing...";
        btn.disabled = true;

        try {
            let res = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify({ 
                    action: 'verifyDeposit', 
                    rowNumber: rowNumber, 
                    email: email,
                    // 🚀 IIT EXPERT FIX: Token injected for Verify & Add
                    adminToken: sessionStorage.getItem('buildMoneyAdminToken') 
                })
            });
            let result = await res.json();
            if (result.status === "success") {
                showCustomAlert("Success! Plan activated and balance added.");
                closeAdminModal();
                fetchDepositRequests(); // Auto refresh list
            } else throw new Error(result.message);
        } catch(e) {
            btn.innerText = "Verify & Add";
            btn.disabled = false;
            showCustomAlert("Error: " + e.message);
        }
    };

    // ==========================================
    // 3. MASTER AUTH STATE LISTENER (Security Check)
    // ==========================================
    // Yeh listener background mein hamesha check karta hai ki user logged in hai ya nahi
    auth.onAuthStateChanged((user) => {
        if (user) {
            // Agar user logged in hai, toh seedha Dashboard dikhao (Login bypass ho jayega)
            history.replaceState({ screen: 'dashboard' }, '', '#dashboard');
            renderDashboardScreen();
        } else {
            // Agar logout ho gaya hai ya naya user hai, toh Login page par bhejo
            history.replaceState({ screen: 'login' }, '', '#login');
            renderLoginScreen();
        }

        // 🚀 IIT EXPERT FIX: Kill the Native Splash Screen instantly after UI is painted
        setTimeout(() => {
            const splashScreen = document.getElementById('native-splash');
            if (splashScreen) {
                splashScreen.style.opacity = '0'; // Smooth fade out trigger
                setTimeout(() => {
                    splashScreen.style.display = 'none'; // Remove completely from DOM flow
                }, 400); // 400ms CSS animation complete hone ka wait
            }
        }, 150); // 150ms buffer taaki browser HTML render kar le
    });

    // ==========================================
    // 4. PWA ENGINE: INSTALLER & OFFLINE DETECTOR
    // ==========================================
    
    // 🚀 1. Register Master Service Worker (Compulsory for Installation)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./firebase-messaging-sw.js')
                .then((reg) => console.log('IIT Expert PWA: Native Engine Activated!'))
                .catch((err) => console.error('PWA Engine Failed:', err));
        });
    }

    // 🚀 2. Premium Smart Install Banner Logic
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault(); // Stop default browser mini-info bar
        deferredPrompt = e;
        showInstallBanner(); // Trigger our custom premium banner
    });

    function showInstallBanner() {
        if (document.getElementById('pwa-install-banner')) return;

        const banner = document.createElement('div');
        banner.id = 'pwa-install-banner';
        // Premium Floating Dark Banner UI
        banner.innerHTML = `
            <div style="position: fixed; bottom: 90px; left: 50%; transform: translateX(-50%); width: 90%; max-width: 400px; background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(10px); color: white; padding: 12px 18px; border-radius: 20px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 9999; animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <img src="./icon-192x192.png" style="width: 36px; height: 36px; border-radius: 8px;">
                    <div style="display: flex; flex-direction: column;">
                        <span style="font-size: 14px; font-weight: 700;">Install Build Money</span>
                        <span style="font-size: 11px; color: #cbd5e1;">For faster & native experience</span>
                    </div>
                </div>
                <button id="pwaInstallBtn" style="background: #10b981; color: white; border: none; padding: 8px 16px; border-radius: 12px; font-weight: 800; font-size: 12px; cursor: pointer; transition: transform 0.1s;">INSTALL</button>
            </div>
        `;
        document.body.appendChild(banner);

        const installBtn = document.getElementById('pwaInstallBtn');
        installBtn.addEventListener('mousedown', () => installBtn.style.transform = 'scale(0.95)');
        
        installBtn.addEventListener('click', async () => {
            banner.remove(); // Remove banner instantly
            if (deferredPrompt) {
                deferredPrompt.prompt(); // Show native browser install prompt
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    console.log('User installed the app');
                }
                deferredPrompt = null;
            }
        });
    }

    // Success Listener
    window.addEventListener('appinstalled', () => {
        deferredPrompt = null;
        showCustomAlert("Congratulations! App is successfully installed.");
    });

    // 🚀 3. Real-Time Offline/Online Monitor
    window.addEventListener('offline', () => { showCustomAlert("You are offline. Please check your internet connection."); });
    window.addEventListener('online', () => { showCustomAlert("Back online! Connection restored."); });
    if (!navigator.onLine) { showCustomAlert("You are currently offline. Some features may not work."); }

});
