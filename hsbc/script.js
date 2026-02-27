let user = {
  name: "Zhao Yuhang",
  balance: 832918.26,
  transactions: []
};

// Elements
const loginPage = document.getElementById("loginPage");
const bankPage = document.getElementById("bankPage");
const transferPage = document.getElementById("transferPage");
const depositPage = document.getElementById("depositPage");
const withdrawPage = document.getElementById("withdrawPage");

const displayName = document.getElementById("displayName");
const balanceEl = document.getElementById("balance");
const transactionsEl = document.getElementById("transactions");
const loginError = document.getElementById("loginError");

const progressOverlay = document.getElementById("progressOverlay");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

// Login
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

// Show progress (non-blocking)
function showProgress(callback){
  progressBar.style.width="0%";
  progressText.textContent="0%";
  let percent = 0;
  const interval = setInterval(()=>{
    percent += Math.floor(Math.random()*10)+10;
    if(percent>100) percent=100;
    progressBar.style.width = percent+"%";
    progressText.textContent = percent+"%";
    if(percent>=100){
      clearInterval(interval);
      if(callback) callback();
    }
  },20);
}

// Update account info
function updateBankPage(){
  displayName.textContent = user.name;
  balanceEl.textContent = user.balance+"€";
  transactionsEl.innerHTML = "";
  user.transactions.slice().reverse().forEach(t=>{
    const li = document.createElement("li");
    li.textContent = t.text;
    li.style.color = (t.type==="expense")?"red":"#00ff00";
    transactionsEl.appendChild(li);
  });
}

// Navigation
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

// Transfer
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

// Deposit
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

// Withdraw
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
  document.getElementById("username").value="";
  document.getElementById("password").value="";
  loginError.textContent="";
}
