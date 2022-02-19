//tout les messages à afficher

export let new_msg =document.createElement("p");

export class message{
    constructor(txt,couleur ){
    this.txt =txt;
    this.couleur = couleur;    
    }
    
    creerMsg (){
        new_msg.style.opacity = '1'
        new_msg.innerHTML = this.txt;
        new_msg.style.color = this.couleur;
        document.querySelector('#message').appendChild(new_msg); 
        new_msg.classList.add('ereur');
        }
    suppMsg (){
        new_msg.style.opacity = '0';
        new_msg.classList.remove('ereur');
        }   
    }
export const MotIncomplet = new message('<i class="bi bi-exclamation-diamond-fill"></i> Le mot est incomplet','red');
export const Victoire = new message('<i class="bi bi-trophy-fill"></i> Bravo vous avez gagné','green');
export const Game_over = new message('<i class="bi bi-emoji-frown-fill"></i> Game over','red');
