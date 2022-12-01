export class Game {
    public players: string[] = ['Raphael','Raphael','Raphael','Raphael','Raphael','Raphael','Raphael'];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;

    constructor(){
        for (let i = 1; i < 14; i++) {
            this.stack.push('spades_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_'+i);
        }
        this.shuffle();
    }

    shuffle() {
        let currentIndex: number = this.stack.length,  randomIndex: number;
        // While there remain elements to shuffle.
        while (currentIndex != 0)
            currentIndex = this.pickAndSwapElement(currentIndex, randomIndex);
      }

    pickAndSwapElement(currentIndex: number, randomIndex: number){
        randomIndex = this.pickRemainingElement(currentIndex);
        currentIndex--;
        this.swapCurrentElement(currentIndex, randomIndex);
        return currentIndex;
    }
    
    pickRemainingElement(currentIndex: number){
        return Math.floor(Math.random() * currentIndex);
    }

    swapCurrentElement(currentIndex: number, randomIndex: number){
        [this.stack[currentIndex], this.stack[randomIndex]] = [
            this.stack[randomIndex], this.stack[currentIndex]];
    }
}