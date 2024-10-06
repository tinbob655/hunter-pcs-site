class Discord {
    #apiKey;
    discordSender;

    constructor() {
        this.#apiKey = process.env.REACT_APP_DISCORD_WEBHOOK_URL;
    };

    sendMessage(messageContent) {

        //create a discord webhook session
        const request = new XMLHttpRequest();
        request.open("POST", this.#apiKey);
        
        //define the data being sent to the discord bot
        request.setRequestHeader('Content-Type', 'application/json');
        const messageJSON = {
            content: messageContent,
        };
        
        //send the message
        request.send(JSON.stringify(messageJSON));
    };
};

export default Discord;