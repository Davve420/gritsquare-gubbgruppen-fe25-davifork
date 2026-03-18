
const messageInput = document.getElementById("messageInput");
const usernameInput = document.getElementById("usernameInput");
const postBtn = document.getElementById("postBtn");
const messagesList = document.getElementById("messagesList");

// Load messages on page load
window.onload = loadMessages;

postBtn.addEventListener("click", addMessage);

function getMessages() {
  return JSON.parse(localStorage.getItem("messages")) || [];
}

function saveMessages(messages) {
  localStorage.setItem("messages", JSON.stringify(messages));
}

function addMessage() {
  const text = messageInput.value.trim();
  const username = usernameInput.value.trim() || "Anonymous";

  if (!text) return;

  const messages = getMessages();

  const newMessage = {
    id: Date.now(),
    username,
    text,
    likes: 0,
    time: new Date().toLocaleString()
  };

  messages.unshift(newMessage);
  saveMessages(messages);

  messageInput.value = "";
  renderMessages(messages);
}

function loadMessages() {
  const messages = getMessages();
  renderMessages(messages);
}

function renderMessages(messages) {
  messagesList.innerHTML = "";

  messages.forEach(msg => {
    const div = document.createElement("div");
    div.classList.add("message");

    div.innerHTML = `
      <strong>${msg.username}</strong>
      <div>${msg.text}</div>
      <div class="meta">${msg.time}</div>

      <div class="actions">
        <span class="like-btn" onclick="likeMessage(${msg.id})">
          ❤️ ${msg.likes}
        </span>
        <span class="delete-btn" onclick="deleteMessage(${msg.id})">
          🗑️ Delete
        </span>
      </div>
    `;

    messagesList.appendChild(div);
  });
}

function likeMessage(id) {
  const messages = getMessages();

  const updated = messages.map(msg => {
    if (msg.id === id) {
      msg.likes++;
    }
    return msg;
  });

  saveMessages(updated);
  renderMessages(updated);
}

function deleteMessage(id) {
  let messages = getMessages();

  messages = messages.filter(msg => msg.id !== id);

  saveMessages(messages);
  renderMessages(messages);
}


    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Display success message
      const alertDiv = document.getElementById('contactMessage');
      alertDiv.textContent = `Thank you, ${name}! Your message has been sent successfully. We'll be in touch soon.`;
      alertDiv.className = 'alert success';
      alertDiv.style.display = 'block';
      
      // Reset form
      this.reset();
      
      // Hide message after 5 seconds
      setTimeout(function() {
        alertDiv.style.display = 'none';
      }, 5000);
    });