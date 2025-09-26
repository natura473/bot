const input = document.getElementById('input');
const send = document.getElementById('send');
const messages = document.getElementById('messages');


function append(role, text) {
const d = document.createElement('div');
d.className = 'msg ' + (role === 'user' ? 'user' : 'bot');
d.textContent = text;
messages.appendChild(d);
messages.scrollTop = messages.scrollHeight;
}


async function callApi(message) {
const res = await fetch('/api/chat', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ message })
});
const j = await res.json();
if (!res.ok) throw j;
return j.reply;
}


send.onclick = async () => {
const text = input.value.trim();
if (!text) return;
append('user', text);
input.value = '';
append('bot', 'Đang trả lời...');
const botPlaceholder = messages.lastElementChild;
try {
const reply = await callApi(text);
botPlaceholder.textContent = reply;
} catch (e) {
console.error(e);
botPlaceholder.textContent = 'Lỗi: ' + (e?.error || JSON.stringify(e));
}
};


input.addEventListener('keypress', (e) => {
if (e.key === 'Enter' && !e.shiftKey) {
e.preventDefault();
send.click();
}
});