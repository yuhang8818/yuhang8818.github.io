// Simulated user data
let user = {
  name: "Zhao Yuhang",
  balance: 5000,
  transactions: []
};

// Page elements
const loginPage = document.getElementById("loginPage");
const bankPage = document.getElementById("bankPage");
const transferPage = document.getElementById("transferPage");
const depositPage = document.getElementById("depositPage");
const withdrawPage = document.getElementById("withdrawPage");

const displayName = document.getElementById("displayName");
const balanceEl = document.getElementById("balance");
const transactionsEl = document.getElementById("transactions");
const loginError = document.getElementById("loginError");

// Progress bar elements
const progressOverlay = document.getElementById("progressOverlay");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

// Login function (simulated)
function login(){
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if(username && password){
    loginPage.classList.add("hidden");
    bankPage.classList.remove("hidden");
    updateBankPage();
  } else {
    loginError.textContent = "Please enter username and password";
  }
}

// Show progress bar (fast)
function showProgress(callback){
  progressOverlay.classList.remove("hidden");
  progressBar.style.width = "0%";
  progressText.textContent = "0%";

  let percent = 0;
  const interval = setInterval(()=>{
    percent += Math.floor(Math.random()*10)+5; // fast random increment
    if(percent>=100) percent = 100;
    progressBar.style.width = percent + "%";
    progressText.textContent = percent + "%";
    if(percent>=100){
      clearInterval(interval);
      setTimeout(()=>{
        progressOverlay.classList.add("hidden");
        if(callback) callback();
      },100);
    }
  },50);
}

// Update account info
function updateBankPage(){
  displayName.textContent = user.name;
  balanceEl.textContent = user.balance + "€";
  transactionsEl.innerHTML = "";
  user.transactions.slice().reverse().forEach(t=>{
    const li = document.createElement("li");
    li.textContent = t.text;
    if(t.type==="expense") li.style.color = "red";
    else if(t.type==="income") li.style.color = "#00ff00";
    transactionsEl.appendChild(li);
  });
}

// Page navigation
function showTransfer(){ bankPage.classList.add("hidden"); transferPage.classList.remove("hidden"); }
function showDeposit(){ bankPage.classList.add("hidden"); depositPage.classList.remove("hidden"); }
function showWithdraw(){ bankPage.classList.add("hidden"); withdrawPage.classList.remove("hidden"); }
function goBack(){
  transferPage.classList.add("hidden");
  depositPage.classList.add("hidden");
  withdrawPage.classList.add("hidden");
  bankPage.classList.remove("hidden");
  updateBankPage();
}

// Transfer function
function makeTransfer(){
  const recipient = document.getElementById("recipient").value;
  const accountNumber = document.getElementById("accountNumber").value;
  const amount = parseFloat(document.getElementById("transferAmount").value);
  if(!recipient || !accountNumber || isNaN(amount) || amount<=0){
    alert("Please enter valid transfer info!");
    return;
  }
  if(amount>user.balance){
    alert("Insufficient balance!");
    return;
  }

  showProgress(()=>{
    user.balance -= amount;
    user.transactions.push({text:`- ${amount}€ → ${recipient} (Acc: ${accountNumber})`, type:"expense"});
    goBack();
  });
}

// Deposit function
function makeDeposit(){
  const amount = parseFloat(document.getElementById("depositAmount").value);
  if(isNaN(amount) || amount<=0){
    alert("Please enter a valid amount!");
    return;
  }

  showProgress(()=>{
    user.balance += amount;
    user.transactions.push({text:`+ ${amount}€ Deposit`, type:"income"});
    goBack();
  });
}

// Withdraw function
function makeWithdraw(){
  const amount = parseFloat(document.getElementById("withdrawAmount").value);
  if(isNaN(amount) || amount<=0){
    alert("Please enter a valid amount!");
    return;
  }
  if(amount>user.balance){
    alert("Insufficient balance!");
    return;
  }

  showProgress(()=>{
    user.balance -= amount;
    user.transactions.push({text:`- ${amount}€ Withdraw`, type:"expense"});
    goBack();
  });
}

// Logout
function logout(){
  bankPage.classList.add("hidden");
  loginPage.classList.remove("hidden");
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  loginError.textContent = "";
}
