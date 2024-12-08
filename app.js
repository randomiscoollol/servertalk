const serverSelect = document.getElementById('server');
const channelSelect = document.getElementById('channel');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('sendMessage');
const inviteButton = document.getElementById('getInvite');
const statusText = document.getElementById('status');

// Server and channel data
const serverData = {
    "randoms-lazy-projects": {
        invite: "https://discord.gg/TxN2xUDySe",
        channels: {
            "general": 1304679849092317245,
            "off-topic": 1303493488456761458
        }
    },
    "codeboom": {
        invite: "https://discord.gg/GkrtnrNFSv",
        channels: {
            "general": 1306731166501572740
        }
    }
};

// Populate channels when server is selected
function updateChannels() {
    const selectedServer = serverSelect.value;
    const channels = serverData[selectedServer].channels;
    
    // Clear existing options
    channelSelect.innerHTML = '';

    // Populate new options
    for (let channel in channels) {
        const option = document.createElement('option');
        option.value = channel;
        option.textContent = channel;
        channelSelect.appendChild(option);
    }
}

// Send message function
async function sendMessage() {
    const server = serverSelect.value;
    const channel = channelSelect.value;
    const message = messageInput.value;

    if (!message) {
        statusText.textContent = "Please enter a message.";
        return;
    }

    try {
        const response = await fetch('http://xxxxxx.ngrok.io/send_message', {  // Replace with your ngrok URL
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                server: server,
                channel: serverData[server].channels[channel],
                message: message
            })
        });

        if (response.ok) {
            statusText.textContent = "Message sent successfully!";
        } else {
            statusText.textContent = "Failed to send message.";
        }
    } catch (error) {
        statusText.textContent = "Error: " + error.message;
    }
}

// Get server invite link
function getInvite() {
    const server = serverSelect.value;
    const inviteLink = serverData[server].invite;
    window.open(inviteLink, '_blank');
}

// Event listeners
serverSelect.addEventListener('change', updateChannels);
sendButton.addEventListener('click', sendMessage);
inviteButton.addEventListener('click', getInvite);

// Initialize on page load
updateChannels();
