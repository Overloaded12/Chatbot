// DOM elements
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const devInfoBtn = document.getElementById('devInfoBtn');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const coffeePopup = document.getElementById('coffeePopup');
const closeCoffeePopup = document.getElementById('closeCoffeePopup');

// Triggers and counters
const TRIGGERS = {
  greetings: ['hi', 'hello', 'hey', 'hola', 'greetings'],
  farewells: ['bye', 'goodbye', 'see ya', 'see you', 'later', 'cya', 'good night'],
  mathHelp: ['math', 'calculate', 'solve'],
  devContact: ['contact', 'developer', 'roy'],
  appreciation: ['thanks', 'thank you', 'cool', 'nice', 'awesome']
};

let mathCount = 0;
let hasShownCoffeePopup = false;

// Event listeners
sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') handleSend();
});
devInfoBtn.addEventListener('click', () => popup.classList.remove('hidden'));
closePopup.addEventListener('click', () => popup.classList.add('hidden'));
closeCoffeePopup.addEventListener('click', () => coffeePopup.classList.add('hidden'));

// Initial greeting
window.onload = function() {
  setTimeout(() => {
    typewriterEffect("Hi there! I'm Roy's chatbot. How can I help you today? 😊");
  }, 1000);
};

// Handle sending user input
function handleSend() {
  const msg = userInput.value.trim();
  if (!msg) return;
  appendMessage('user', msg);
  userInput.value = '';
  setTimeout(() => botReply(msg), 500);
}

// Show coffee popup
function showCoffeePopup() {
  if (!hasShownCoffeePopup) {
    coffeePopup.classList.remove('hidden');
    hasShownCoffeePopup = true;
    setTimeout(() => {
      coffeePopup.classList.add('hidden');
    }, 10000); // Auto-close after 10 seconds
    
    // Reset after 1 hour if page isn't refreshed
    setTimeout(() => {
      hasShownCoffeePopup = false;
    }, 3600000);
  }
}

// Append message to chat
function appendMessage(sender, text) {
  const div = document.createElement('div');
  div.className = `message ${sender}`;
  div.innerHTML = `<span>${text}</span><span class="trash" onclick="this.parentElement.remove()">🗑️</span>`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Typewriter effect for bot messages
function typewriterEffect(text, callback) {
  let i = 0;
  let displayText = '';
  const interval = setInterval(() => {
    displayText += text[i];
    if (i === 0) appendMessage('bot', displayText);
    else chatBox.lastChild.querySelector('span').innerText = displayText;
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 40);
}

// Bot reply logic
function botReply(input) {
  const msg = input.toLowerCase().trim();
  let response = '';

  if (TRIGGERS.greetings.some(word => msg.includes(word))) {
    response = "Hey there! How are you doing today? 😊";
  }
  else if (TRIGGERS.farewells.some(word => msg.includes(word))) {
    const farewells = [
      "Goodbye! Hope to chat with you again soon! 👋",
      "Thanks for stopping by! Come back anytime! 😊",
      "It was nice talking with you! Have a great day! 🌟",
      "Chat with you later! Don't forget I'm here if you need me! 🤖"
    ];
    response = farewells[Math.floor(Math.random() * farewells.length)];
    showCoffeePopup();
  }
  else if (msg.includes('how are you')) {
    response = "I'm just a chatbot, but I'm functioning perfectly! How can I help you today? 🤖";
  }
  else if (msg.includes('good') || msg.includes('fine') || msg.includes('well')) {
    response = "Great to hear that! Would you like to know what I can do? 💪";
  }
  else if (TRIGGERS.mathHelp.some(word => msg.includes(word))) {
    response = "I can help with math! Try sending me an expression like '2 + 3' or '(4 * 5) / 2' and I'll calculate it for you. 😎";
  }
  else if (TRIGGERS.devContact.some(word => msg.includes(word)) || msg === 'roy') {
    response = "You can contact Roy (my developer) at:\n📞 0743956104\n📧 roywashika@gmail.com\nHe does motion graphics, logo design, and UI/UX design! 🎨";
  }
  else if (TRIGGERS.appreciation.some(word => msg.includes(word))) {
    response = "You're welcome! 😊";
    showCoffeePopup();
  }
  else if (/^[\d\s+\-*/().]+$/.test(msg)) {
    try {
      const result = eval(msg);
      response = `The result is: ${result} ✅`;
      mathCount++;
      
      // Show coffee popup after 3rd math solution
      if (mathCount === 3) {
        setTimeout(showCoffeePopup, 1500);
      }
    } catch {
      response = "I couldn't solve that math problem. Please check your expression and try again. 🧮";
    }
  }
  else {
    response = "I'm still learning! Right now I can:\n1. Have simple conversations\n2. Solve math problems (type 'math')\n3. Connect you with my developer (type 'Roy')\nWhat would you like to try? 🤔";
  }

  typewriterEffect(response);
}