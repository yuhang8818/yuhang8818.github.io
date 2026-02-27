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

// Update account info
function updateBankPage(){
  displayName.textContent = user.name;
  balanceEl.textContent = user.balance + "€";
  transactionsEl.innerHTML = "";
  user.transactions.slice().reverse().forEach(t=>{
    const li = document.createElement("li");
    li.textContent = t.text;

    // 根据类型改变颜色
    if(t.type === "expense"){
      li.style.color = "red";  // 扣钱红色
    } else if(t.type === "income"){
      li.style.color = "#00ff00"; // 收入绿色
    }
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
  user.balance -= amount;

  // 支出：红色带 - 符号
  user.transactions.push({text:`- ${amount}€ → ${recipient} (Acc: ${accountNumber})`, type:"expense"});

  goBack();
}

// Deposit (income)
function makeDeposit(){
  const amount = parseFloat(document.getElementById("depositAmount").value);
  if(isNaN(amount) || amount<=0){
    alert("Please enter a valid amount!");
    return;
  }
  user.balance += amount;

  // 收入：绿色带 + 符号
  user.transactions.push({text:`+ ${amount}€ Deposit`, type:"income"});

  goBack();
}

// Withdraw (expense)
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
  user.balance -= amount;

  // 支出：红色带 - 符号
  user.transactions.push({text:`- ${amount}€ Withdraw`, type:"expense"});

  goBack();
}

// Logout
function logout(){
  bankPage.classList.add("hidden");
  loginPage.classList.remove("hidden");
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  loginError.textContent = "";
}
