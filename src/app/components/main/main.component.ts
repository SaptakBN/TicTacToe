import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  player1!: string;
  player2!: string;
  activeplayer: string='';
  winner!: string;
  game: boolean = false;
  draw:boolean=false;
  cross: string = 'assets/img/x.png';
  circle: string = 'assets/img/circle.png';
  box: any[] = [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined];
  winningFormula: any[] = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
  line: any[] = [false, false, false, false, false, false, false, false];

  select(player: string, mark: string) {
    if(!this.game){
    switch (player) {
      case '1':
        if (mark == 'x') {
          this.player1 = this.cross;
          this.player2 = this.circle;
        } else if (mark == '0') {
          this.player1 = this.circle;
          this.player2 = this.cross;
        }
        this.game=true;
        this.activeplayer = this.player1;
        break;
        case '2':
          if (mark == 'x') {
            this.player1 = this.circle;
            this.player2 = this.cross;
          } else if (mark == '0') {
            this.player1 = this.cross;
            this.player2 = this.circle;
          }
        this.game=true;
        this.activeplayer = this.player2;
        break;
    }
    }
  }
  mark(i: number) {
    if (this.game && this.box[i]==undefined) {
      this.box.splice(i, 1, this.activeplayer);
      this.changeActivePlayer();
      this.pickWinner();
    }
  }
  changeActivePlayer() {
    if(this.game){
      if (this.activeplayer == this.player1) {
        this.activeplayer = this.player2;
      } else if (this.activeplayer == this.player2) {
        this.activeplayer = this.player1;
      }
    }
  }
  pickWinner() {
    this.winningFormula.map((v, i) => {
      let [a, b, c] = v;
      if (
        this.box[a] == this.box[b] &&
        this.box[b] == this.box[c] &&
        this.box[b] != undefined
      ) {
        this.line.splice(i, 1, true);
        if (this.activeplayer == this.player1) {
          this.winner = 'Player 2';
        } else if (this.activeplayer == this.player2) {
          this.winner = 'Player 1';
        }
        this.game = false;
        this.activeplayer='';
      }
    });
    let drawCount=0;
    this.box.map(d=>{
      if(d==undefined){
        drawCount++
      }
    })
    if(drawCount==0 && this.winner==undefined){
      this.draw=true;
      this.activeplayer='';
    }
  }
}
