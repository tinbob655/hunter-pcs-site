import {doc, getDoc, getFirestore} from 'firebase/firestore';

export function clickGetStartedButton() {

    //make sure the user has an account, if not, make them create one

    //CANNOT COMPLETE THIS FUNCTION AND THEREFORE THIS PAGE UNTIL THE ACCOUNTS PAGE IS MADE
    const db = getFirestore();

    //take the user to pcpartpickers.com
    alert('Leaving this website!\n\nThis is a link to an external site, proceed at own risk.');
    window.open('https://pcpartpicker.com/list/');

    //show the ui for submitting a designed pc
    document.getElementById('pcPartsDialogueBox').classList.add('shown');
};