const usernameInput = document.getElementById('username');
const enterBtn = document.getElementById('enterBtn');
const overlay = document.getElementById('namePrompt');
const messages = document.getElementById('messages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const speech = document.getElementById('speech');
const character = document.getElementById('character');

let userName = '';
let idleTimer;
let idleQuotes = [
  "Đang làm gì đó...",
  "Hôm nay của bạn thế nào?",
  "Ngày hôm nay của bạn có ổn không?",
  "Bạn có chuyện gì muốn tâm sự không?",
  "MQuang ghét hóa 😫",
  "MQuang rất thích đá bóng ⚽",
  "MQuang không muốn làm bạn buồn đâu, nếu có thì xin lỗi nheee 🥺"
];

function showSpeech(text) {
  speech.textContent = text;
  speech.style.display = "block";
  clearTimeout(speech.hideTimer);
  speech.hideTimer = setTimeout(() => speech.style.display = "none", 3000);
}

// Khi nhấn vào nút “Vào”
enterBtn.onclick = () => {
  userName = usernameInput.value.trim() || "Khách";
  overlay.style.display = "none";
  showSpeech("Bạn là ai đó? MQuang đây~");
  startIdleTalk();
};

// Chat box
sendBtn.onclick = () => {
  const text = chatInput.value.trim();
  if (text) {
    const div = document.createElement("div");
    div.textContent = `${userName}: ${text}`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    chatInput.value = "";
    // MQuang phản hồi ngẫu nhiên
    setTimeout(() => showSpeech("Ừm... " + text + " hả? 😅"), 1000);
  }
};

// Khi kéo nhân vật
let dragging = false;
let offsetX, offsetY;

character.addEventListener("mousedown", (e) => {
  dragging = true;
  offsetX = e.offsetX;
  offsetY = e.offsetY;
  showSpeech("Bỏ Minh Quang raaaa 😭");
});

document.addEventListener("mouseup", () => {
  if (dragging) {
    dragging = false;
    showSpeech("Đau vãi 😣");
  }
});

document.addEventListener("mousemove", (e) => {
  if (dragging) {
    character.style.left = (e.pageX - offsetX - 50) + "px";
    character.style.top = (e.pageY - offsetY) + "px";
  }
});

// Tự động lời thoại sau 5s không làm gì
function startIdleTalk() {
  resetIdleTimer();
  document.addEventListener("mousemove", resetIdleTimer);
  document.addEventListener("click", resetIdleTimer);
}

function resetIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    const text = idleQuotes[Math.floor(Math.random() * idleQuotes.length)];
    showSpeech(text);
  }, 5000);
}
