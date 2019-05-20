import store from '../store.js';
import { loginAnimationLoaded } from '../actions/actionsPrototypes.js';
import { logWithTime } from '../utils/utils.js';

/*
It's probably not the best pattern to import redux store into
a non-React class but I don't see a better solution to my problem:
display signature and login button after animation finishes.
I tried wrapping setTimeouts in promises but then I have to use for await
loop which runs very slow. Not worth it.
 */
class ScrambleText {
  constructor (node, textToScramble) {
    this.node = node;
    this.textToScramble = textToScramble;
    this.possibleChars = '-+*/|}{[]~\\":;?/.><=+-_)(*&^%$#@!)}';
    this.generateRandomStringTimeout = 110;
    this.scrambleTimeout = 500;
  }

  checkIfAnimationLoaded = animationIteration => {
    if (animationIteration === this.textToScramble.length) {
      logWithTime('checkIfAnimationLoaded');
      store.dispatch(loginAnimationLoaded());
    }
  }

  setNode = (animationIteration, randomizedString) => {
    setTimeout(() => {
      this.node.innerHTML = randomizedString;
      logWithTime('setNode, i= ' + animationIteration);
      this.checkIfAnimationLoaded(animationIteration);
    }, animationIteration * this.generateRandomStringTimeout);
  };

  getRandomChar = () => {
    return this.possibleChars.charAt(Math.floor(Math.random() * this.possibleChars.length));
  }

  getRandomString = (i, inString) => {
    let randomizedString = inString;
    for (let j = i; j < this.textToScramble.length; j++) {
      randomizedString += this.getRandomChar();
    }
    return randomizedString;
  }

  scrambleText = () => {
    setTimeout(() => {
      let stringToRandomize = '';
      for (let i = 0; i < this.textToScramble.length + 1; i++) {
        stringToRandomize = this.textToScramble.substring(0, i);
        const randomizedString = this.getRandomString(i, stringToRandomize);
        this.setNode(i, randomizedString);
        stringToRandomize = '';
      }
    }, this.scrambleTimeout);
  };
}

export default ScrambleText;
