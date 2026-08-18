document.addEventListener('DOMContentLoaded', () => {
    
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
        else if (screen === 'deposit') renderDepositScreen(); // Premium Feature Screen Add kiya
        else if (screen === 'support') renderSupportScreen();
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
            <div class="screen text-center">
                <div class="logo-circle"></div>
                <h1>Bright Future Academy</h1>
                <p class="subtitle">Earn by writing. Grow with your team.</p>

                <form id="loginForm">
                    <div class="input-group text-left">
                        <label>Email</label>
                        <input type="email" id="loginEmail" placeholder="you@example.com" required>
                    </div>
                    <div class="input-group text-left">
                        <label>Password</label>
                        <input type="password" id="loginPassword" placeholder="........" required>
                    </div>
                    <button type="submit" class="btn-primary" id="loginBtn">Login</button>
                </form>

                <a class="forgot-link text-green font-bold cursor-pointer" id="goToForgot">Forgot Password?</a>
                <p class="bottom-link">New user? <span class="text-green font-bold cursor-pointer" id="goToRegister">Register</span></p>
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
                <p class="subtitle text-left">Join Bright Future Academy</p>

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

            // ⚠️ YAHAN APNI WEB APP KI URL PASTE KAREIN
            const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx9Whohe4XFyQ5uPpBd37UJPfLvn04ri176Xonlf4CvT0NGDxkYgJWNl_f0vAIlxwLRtw/exec"; 

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
                        <span class="badge-inactive">Inactive</span>
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
                        <h3>Daily Check-in Bonus</h3>
                        <p>Claim Rs. 20 daily until your account is activate</p>
                        <div class="claimed-days" id="totalClaimedDaysText">Total claimed: 0 days</div>
                    </div>
                    <button class="btn-golden" id="claimBonusBtn" disabled>Loading...</button>
                </div>

                <div class="plan-card">
                    <h3>Choose a Plan</h3>
                    <p>Deposit karke account activate karein aur pages submit karein.</p>
                </div>

                <div class="section-title">Recent Submissions</div>
                <p class="empty-state">Koi submission nahi hai abhi.</p>
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
        // ⚠️ IIT EXPERT NOTE: Make sure to paste your absolute NEWEST Google Script URL below after deployment
        const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx9Whohe4XFyQ5uPpBd37UJPfLvn04ri176Xonlf4CvT0NGDxkYgJWNl_f0vAIlxwLRtw/exec"; 
        
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
                walletAmt.innerText = `₹${result.totalBonus}.00`;
                earnedAmt.innerText = `Total Earned: ₹${result.totalBonus}.00`;

                // 🚀 IIT EXPERT FIX: Client-side time hata diya. Ab strictly backend 'serverToday' check karega.
                if (result.lastClaimDate === result.serverToday) {
                    claimBtn.disabled = true; 
                    claimBtn.innerHTML = `<span class="material-symbols-rounded" style="font-size:16px; margin-right:4px;">check</span>Already Claimed`;
                    claimBtn.style.background = "#e6cd9e";
                } else {
                    claimBtn.disabled = false; 
                    claimBtn.innerHTML = "Claim ₹20 Now";
                    claimBtn.style.background = "#f0c375";
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

                        if (claimData.status === "success") {
                            // UI Live Update (Instant wallet upgrade without reload)
                            daysText.innerText = `Total claimed: ${claimData.totalDays} days`;
                            walletAmt.innerText = `₹${claimData.totalBonus}.00`;
                            earnedAmt.innerText = `Total Earned: ₹${claimData.totalBonus}.00`;
                            
                            claimBtn.disabled = true;
                            claimBtn.innerHTML = `<span class="material-symbols-rounded" style="font-size:16px; margin-right:4px;">check</span>Claimed for Today`;
                            claimBtn.style.background = "#e6cd9e";
                            showCustomAlert("Premium Unlock: ₹20 bonus successfully aapke wallet mein add ho gaya!");
                        } else if (claimData.status === "already_claimed") {
                            claimBtn.disabled = true;
                            claimBtn.innerHTML = `<span class="material-symbols-rounded" style="font-size:16px; margin-right:4px;">check</span>Claimed for Today`;
                            claimBtn.style.background = "#e6cd9e";
                            showCustomAlert("Aap aaj ka bonus already claim kar chuke hain. Kal phir aaiye!");
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
            claimBtn.innerHTML = "Sync Error - Refresh Page";
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
        appContainer.innerHTML = generateUpcomingScreen("Help & Support", "support_agent") + getBottomNavHTML('support');
    }

    // ==========================================
    // PREMIUM DEPOSIT & ACTIVATE SCREEN
    // ==========================================
    function renderDepositScreen() {
        appContainer.innerHTML = `
            <div class="top-nav">
                <button class="back-btn" id="goBackDeposit">
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
                <div class="nav-title text-center" style="font-size: 20px;">Deposit & Activate</div>
                <div style="width: 24px;"></div> <!-- Spacer for center alignment -->
            </div>
            
            <div class="screen" style="padding-bottom: 100px;">
                <h3 class="section-title" style="margin-top: 0;">Select Plan</h3>
                
                <!-- Dynamic Plan Selector Engine -->
                <div class="plan-list">
                    <div class="plan-card-item" data-price="799">
                        <div class="plan-info">
                            <h4>Starter</h4>
                            <p class="text-green font-bold">₹100/page</p>
                        </div>
                        <div class="plan-price">₹799</div>
                    </div>
                    
                    <div class="plan-card-item" data-price="1499">
                        <div class="plan-info">
                            <h4>Growth</h4>
                            <p class="text-green font-bold">₹210/page</p>
                        </div>
                        <div class="plan-price">₹1499</div>
                    </div>
                    
                    <div class="plan-card-item" data-price="3200">
                        <div class="plan-info">
                            <h4>Premium</h4>
                            <p class="text-green font-bold">₹400/page</p>
                        </div>
                        <div class="plan-price">₹3200</div>
                    </div>
                </div>

                <!-- Live Payment Instructions Box -->
                <div class="payment-instruction-box">
                    <h4 class="text-green font-bold" style="margin-bottom: 10px; font-size: 15px;">Payment Instructions</h4>
                    <p style="margin-bottom: 8px; font-size: 14px; font-weight: 500;">UPI ID: <strong style="color: #000;">8822778233@nyes</strong></p>
                    <p style="margin-bottom: 12px; font-size: 14px; font-weight: 500;">Amount: <strong id="dynamicAmount" style="color: #000;">₹0</strong></p>
                    <p style="font-size: 13px; color: #1b6e35;">Kindly Upload your screenshot after payment.</p>
                </div>

                <h3 class="section-title">Payment Screenshot</h3>
                
                <!-- Dummy Image Picker -->
                <label class="screenshot-upload-box" for="screenshotFile">
                    <span class="material-symbols-outlined text-green" style="font-size: 36px; margin-bottom: 8px;" id="uploadIcon">image</span>
                    <p class="text-green font-bold" id="uploadText" style="font-size: 14px;">Tap to upload screenshot</p>
                    <input type="file" id="screenshotFile" accept="image/*" style="display: none;">
                </label>

                <h3 class="section-title">Transaction / UTR Ref (optional)</h3>
                <div class="input-group">
                    <input type="number" placeholder="Enter 12-digit UTR Number" style="background: #f4f6f5;">
                </div>

                <button class="btn-primary" style="margin-top: 15px;">Submit Request</button>
            </div>
            ${getBottomNavHTML('wallet')} 
        `;

        // 1. Hardware-Sync Back Button Logic (100% Bulletproof)
        document.getElementById('goBackDeposit').addEventListener('click', () => {
            // IIT Expert Logic: Agar app ki internal history exist karti hai toh native system back press trigger karo
            if (window.history.length > 1) {
                window.history.back(); // Yeh exactly phone ke hard backpress jaisa kaam karega
            } else {
                // Loophole Closure: Agar user direct link se aaya hai aur history nahi hai, toh gracefully dashboard par bhej do
                navigateTo('dashboard', false); 
            }
        });

        // 2. Dynamic Price Engine (Professional Plan Selection)
        const planCards = document.querySelectorAll('.plan-card-item');
        const amountDisplay = document.getElementById('dynamicAmount');

        planCards.forEach(card => {
            card.addEventListener('click', () => {
                // Remove active class from all
                planCards.forEach(c => c.classList.remove('active'));
                // Add active to clicked one
                card.classList.add('active');
                // Update Amount dynamically
                const price = card.getAttribute('data-price');
                amountDisplay.innerText = `₹${price}`;
            });
        });

        // 3. Pro Image Upload UX (Bina backend ke real feel dega abhi)
        const fileInput = document.getElementById('screenshotFile');
        const uploadText = document.getElementById('uploadText');
        const uploadIcon = document.getElementById('uploadIcon');

        fileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                uploadText.innerText = "Screenshot Selected! (Tap to change)";
                uploadIcon.innerText = "check_circle"; // Green Tick mark
            }
        });
    }

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
    });

    // ==========================================
    // 4. REAL-TIME OFFLINE/ONLINE DETECTOR
    // ==========================================
    window.addEventListener('offline', () => {
        showCustomAlert("You are offline. Please check your internet connection.");
    });

    window.addEventListener('online', () => {
        showCustomAlert("Back online! Connection restored.");
    });

    // Pehli baar app khulte hi check karega
    if (!navigator.onLine) {
        showCustomAlert("You are currently offline. Some features may not work.");
    }

});