// 模拟用户数据
let user = {
  name: "YUHANG ZHAO",
  balance: 882581.89,
  transactions: []
};

// 页面元素
const loginPage = document.getElementById("loginPage");
const bankPage = document.getElementById("bankPage");
const transferPage = document.getElementById("transferPage");
const depositPage = document.getElementById("depositPage");
const withdrawPage = document.getElementById("withdrawPage");

const displayName = document.getElementById("displayName");
const balanceEl = document.getElementById("balance");
const transactionsEl = document.getElementById("transactions");
const loginError = document.getElementById("loginError");

// 登录功能（模拟验证）
function login(){
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if(username && password){
    loginPage.classList.add("hidden");
    bankPage.classList.remove("hidden");
    updateBankPage();
  } else {
    loginError.textContent = "请输入用户名和密码";
  }
}

// 更新账户信息
function updateBankPage(){
  displayName.textContent = user.name;
  balanceEl.textContent = user.balance + "€";
  transactionsEl.innerHTML = "";
  user.transactions.slice().reverse().forEach(t=>{
    const li = document.createElement("li");
    li.textContent = t;
    transactionsEl.appendChild(li);
  });
}

// 页面跳转
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

// 转账功能
function makeTransfer(){
  const recipient = document.getElementById("recipient").value;
  const accountNumber = document.getElementById("accountNumber").value;
  const amount = parseFloat(document.getElementById("transferAmount").value);
  if(!recipient || !accountNumber || isNaN(amount) || amount<=0){
    alert("请输入正确的转账信息！");
    return;
  }
  if(amount>user.balance){
    alert("余额不足！");
    return;
  }
  user.balance -= amount;
  user.transactions.push(`转账 ${amount}€ → ${recipient}（账号：${accountNumber}）`);
  goBack();
}

// 充值
function makeDeposit(){
  const amount = parseFloat(document.getElementById("depositAmount").value);
  if(isNaN(amount) || amount<=0){
    alert("请输入正确金额！");
    return;
  }
  user.balance += amount;
  user.transactions.push(`充值 ${amount}€`);
  goBack();
}

// 提现
function makeWithdraw(){
  const amount = parseFloat(document.getElementById("withdrawAmount").value);
  if(isNaN(amount) || amount<=0){
    alert("请输入正确金额！");
    return;
  }
  if(amount>user.balance){
    alert("余额不足！");
    return;
  }
  user.balance -= amount;
  user.transactions.push(`提现 ${amount}€`);
  goBack();
}

// 登出
function logout(){
  bankPage.classList.add("hidden");
  loginPage.classList.remove("hidden");
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  loginError.textContent = "";
}
