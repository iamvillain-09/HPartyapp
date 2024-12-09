const nameInput = document.getElementById("nameInput");
const addNameButton = document.getElementById("addNameButton");
const nameList = document.getElementById("nameList");
const actionInput = document.getElementById("actionInput");
const addActionButton = document.getElementById("addActionButton");
const actionList = document.getElementById("actionList");
const startGameButton = document.getElementById("startGameButton");
const gamePage = document.getElementById("gamePage");
const nameInputPage = document.getElementById("nameInputPage");
const selectedNameAction = document.getElementById("selectedNameAction");
const nextActionButton = document.getElementById("nextActionButton");
const backButton = document.getElementById("backButton");

const editModal = document.getElementById("editModal");
const editModalInput = document.getElementById("editModalInput");
const saveEditButton = document.getElementById("saveEditButton");
const cancelEditButton = document.getElementById("cancelEditButton");

let names = [];
const emojiList = [
    "🎉", "😎", "🤩", "🥳", "😜", "😂", "🎊", "🦄", "🔥", "💃",
    "🕺", "🍹", "🌟", "🍀", "🎁", "😈", "😇", "🤖", "👑", "🎶"
];
let actions = [
    "Give someone in the group a romantic compliment... but make it awkward.",
    "Whisper something mysterious to the person next to you.",
    "Share your most romantic or funny pick-up line.",
    "Pretend to flirt someone with an imaginary guitar.",
    "Act like you're on a steamy reality TV dating show for 1 minute.",
    "Choose a person to 'slow dance' with no music for 30 seconds.",
    "Let someone in the group pick your next drink.",
    "Play rock-paper-scissors with someone. Loser takes a 2 sip.",
    "Switch seats with someone and sit on their lap for the next round.",
    "Share a spicy but safe secret about yourself.",
    "Share a funny secret about yourself.",
    "Act out a romantic scene from a movie with someone in the group.",
    "Choose someone to take a selfie with and make it your profile picture for 1 hour.",
    "Spin an imaginary bottle and pretend it landed on someone for a dare.",
    "Pretend to flirt with someone using the cheesiest lines you can think of.",
    "Describe your ideal date in under 30 seconds.",
    "Describe someone from the group as an ideal date in under 30 seconds.",
    "Give a dramatic toast to love and relationships!",
    "Pretend you're writing a love letter to someone in the group.",
    "Ask someone in the group a 'truth' question of your choice.",
    "Call someone your 'soulmate' for the next 10 minutes."
];
const sipActions = [
    "Everyone take a sip 🍹",
    "Everyone take 2 sips 🍹🍹",
    "Everyone take 3 sips 🍹🍹🍹",
    "Everyone finish your glass 🥂"
];
let editIndex = null;
let editType = null;

// Add a name with a random emoji
addNameButton.addEventListener("click", () => {
    const name = nameInput.value.trim();
    if (name) {
        const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
        const nameObj = { name, emoji: randomEmoji };
        names.push(nameObj);
        updateNameList();
        nameInput.value = "";
        startGameButton.disabled = false;
    }
});

// Add a custom action
addActionButton.addEventListener("click", () => {
    const action = actionInput.value.trim();
    if (action) {
        actions.push(action);
        updateActionList();
        actionInput.value = "";
    }
});

// Update the name list
function updateNameList() {
    nameList.innerHTML = ""; // Clear the list
    names.forEach((nameObj, index) => {
        const li = document.createElement("li");
        li.textContent = `${nameObj.emoji} ${nameObj.name}`;
        const editButton = document.createElement("span");
        editButton.textContent = " ✏️";
        editButton.style.cursor = "pointer";
        editButton.addEventListener("click", () => openEditModal(index, "name"));
        const removeButton = document.createElement("span");
        removeButton.textContent = " ❌";
        removeButton.style.cursor = "pointer";
        removeButton.addEventListener("click", () => removeName(index));
        li.appendChild(editButton);
        li.appendChild(removeButton);
        nameList.appendChild(li);
    });
}

// Update the action list
function updateActionList() {
    actionList.innerHTML = ""; // Clear the list
    actions.slice(20).forEach((action, index) => { // Only custom actions
        const li = document.createElement("li");
        li.textContent = action;
        const editButton = document.createElement("span");
        editButton.textContent = " ✏️";
        editButton.style.cursor = "pointer";
        editButton.addEventListener("click", () => openEditModal(index + 20, "action"));
        const removeButton = document.createElement("span");
        removeButton.textContent = " ❌";
        removeButton.style.cursor = "pointer";
        removeButton.addEventListener("click", () => removeAction(index + 20));
        li.appendChild(editButton);
        li.appendChild(removeButton);
        actionList.appendChild(li);
    });
}

// Open the edit modal
function openEditModal(index, type) {
    editIndex = index;
    editType = type;
    editModalInput.value = type === "name" ? names[index].name : actions[index];
    editModal.style.display = "block";
}

// Save changes in the modal
saveEditButton.addEventListener("click", () => {
    const newValue = editModalInput.value.trim();
    if (newValue) {
        if (editType === "name") {
            names[editIndex].name = newValue;
            updateNameList();
        } else if (editType === "action") {
            actions[editIndex] = newValue;
            updateActionList();
        }
        closeEditModal();
    }
});

// Close the edit modal
cancelEditButton.addEventListener("click", closeEditModal);
function closeEditModal() {
    editModal.style.display = "none";
}

// Remove a name
function removeName(index) {
    names.splice(index, 1);
    updateNameList();
    startGameButton.disabled = names.length === 0;
}

// Remove an action
function removeAction(index) {
    actions.splice(index, 1);
    updateActionList();
}

// Start the game
startGameButton.addEventListener("click", () => {
    nameInputPage.style.display = "none";
    gamePage.style.display = "block";
    getNextAction(); // Ensure the first action appears when the game starts
});

// Go back to the name input page
backButton.addEventListener("click", () => {
    gamePage.style.display = "none";
    nameInputPage.style.display = "block";
});

// Get the next action for a random name or sip action
nextActionButton.addEventListener("click", getNextAction);

function getNextAction() {
    if (names.length === 0) {
        selectedNameAction.innerHTML = "No names added! Restart the game.";
        nextActionButton.disabled = true;
        return;
    }

    const isSipAction = Math.random() < 0.2; // 20% chance for a sip action
    if (isSipAction) {
        const randomSipAction = sipActions[Math.floor(Math.random() * sipActions.length)];
        selectedNameAction.innerHTML = `<span class="action">${randomSipAction}</span>`;
    } else {
        const randomNameIndex = Math.floor(Math.random() * names.length);
        const randomActionIndex = Math.floor(Math.random() * actions.length);
        const selectedNameObj = names[randomNameIndex];
        const selectedAction = actions[randomActionIndex];
        selectedNameAction.innerHTML = `
            <span class="name">${selectedNameObj.emoji} ${selectedNameObj.name}</span>: 
            <span class="action">${selectedAction}</span>
        `;
    }
}
