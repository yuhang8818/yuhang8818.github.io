let balance = 0;

const balanceDisplay = document.getElementById('balance');
const clickerButton = document.getElementById('clicker');

clickerButton.addEventListener('click', () => {
    balance += 88.88; // 每次点击赚1欧元
    balanceDisplay.textContent = balance;

    // 随机弹出赵宇航神力提示
    const messages = [
        "赵宇航大神加持！",
        "欧元滚滚来，赵宇航是神！",
        "膜拜赵宇航，欧元+1",
        "赵宇航守护金库！",
        "赵宇航大神微笑了，你赚了欧元！"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    alert(randomMessage);
});
