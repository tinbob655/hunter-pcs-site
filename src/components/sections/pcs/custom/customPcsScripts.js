export function clickGetStartedButton() {

    //make sure the user has an account, if not, make them create one

    //get the address off the user

    //take the user to pcpartpickers.com
    alert('Leaving this website!\n\nThis is a link to an external site, proceed at own risk.');
    window.open('https://pcpartpicker.com/list/');

    //show the ui for submitting a designed pc
    document.getElementById('pcPartsDialogueBox').classList.add('shown');

    // promot the user to send an email with a picture of the product from pcpartpickers.com
};