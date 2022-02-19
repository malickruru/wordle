import { MOTS }   from './mots.js';
import { $, $$ } from './util.js';
import { message, MotIncomplet, new_msg, Victoire, Game_over } from './erreur.js';

//console.log(MOTS.length);


var AideOuverte = true;
var reponse = "";
var reponseTAB = [];
var mot_a_deviner = [];
var liste_de_class =".span-letter-0";
var essai =0;

//choisir le mot à deviner
function choisir_mot_a_deviner(){
      let index = Math.floor(Math.random() * MOTS.length + 1);
      mot_a_deviner = Array.from(MOTS[index]);
      //alert( mot_a_deviner);
}

window.addEventListener('load',choisir_mot_a_deviner);


//afficher et cacher l'aide

$('#btn-aide').addEventListener('click',() => {
      if( AideOuverte ){
            $('#aide').classList.add('aide-close');
            AideOuverte = false;
      }else{
           $('#aide').classList.remove('aide-close');
           AideOuverte = true;}
      })

// ecrire 

$$('.LettreDuClavier').forEach(item => {
      item.addEventListener('click', event => {
            ecrire(item.id);  
      })
    });

function ecrire(lettre){
    
      if(reponse.length < 5)
      { 
            reponse += lettre;
            ecrireDOM();
      } 
     
}

function ecrireDOM(){
      //initiliser 
      $$(liste_de_class).forEach(elem => elem.innerText="");

      //ecrit
      for(let i = 0; i < reponse.length ; i++){
      let reponseMAJ = reponse.toUpperCase();
      $$(liste_de_class)[i].innerText=reponseMAJ[i];
      }     
}

//effacer

$('#effacer').addEventListener('click',() => {
     reponseTAB = Array.from(reponse);//converti en tableau
     reponseTAB.pop();//supprime le dernier element
     reponse = reponseTAB.join('')//met a jour le mot
     ecrireDOM();
})

//validation

$('#entrer').addEventListener('click',evalReponse);




function evalReponse(){
      //si le mot est incomplet
      if(reponse.length < 5){
            MotIncomplet.creerMsg();
            setTimeout(MotIncomplet.suppMsg,3000);
      }
      else{
            reponseTAB = Array.from(reponse);
            for (let index = 0; index < reponseTAB.length; index++) {
                  if(mot_a_deviner.includes(reponseTAB[index])){
                        if(reponseTAB[index] == mot_a_deviner[index]){
                              $$(liste_de_class)[index].classList.add('vert');
                              $('#'+reponseTAB[index]).classList.add('vert');
                        }else{
                              $$(liste_de_class)[index].classList.add('jaune'); 
                              $('#'+reponseTAB[index]).classList.add('vert'); 
                        }
                  } else{
                        $$(liste_de_class)[index].classList.add('rouge');
                        $('#'+reponseTAB[index]).classList.add('rouge');
                  }
            }      
            bonneReponse();      
      }   
}



// game over
function bonneReponse(){
      essai++;
      if( JSON.stringify(reponseTAB) == JSON.stringify(mot_a_deviner)){
            Victoire.creerMsg();
            document.querySelector('#message').appendChild(rejouer);
            document.querySelector('#message').appendChild(rejouer_2);
            $('#rejouer_2').addEventListener('click',rejouer_mm_mot);
            $('#rejouer').addEventListener('click',rejouer_autre_mot);
      }else {
            if (essai < 6){
            liste_de_class = ".span-letter-"+essai;
            }else{
            Game_over.creerMsg();
            document.querySelector('#message').appendChild(rejouer);
            document.querySelector('#message').appendChild(rejouer_2);
            $('#rejouer_2').addEventListener('click',rejouer_mm_mot);
            $('#rejouer').addEventListener('click',rejouer_autre_mot);
            }
}
reponse="";
}

//rejouer
let rejouer =document.createElement("button");
rejouer.id = 'rejouer';
rejouer.classList.add('btn')
rejouer.innerText='Rejouer avec un autre mot';

//rejouer avec le meme mot

let rejouer_2 =document.createElement("button");
rejouer_2.id = 'rejouer_2';
rejouer_2.classList.add('btn')
rejouer_2.innerText='Rejouer avec le même mot';

function rejouer_mm_mot (){
      $$('.span-letter').forEach(elem => {
            elem.innerText = "";
            elem.classList.remove('vert');
            elem.classList.remove('jaune');
            elem.classList.remove('rouge');
      });
      $$('.LettreDuClavier').forEach(elem => {
            elem.classList.remove('vert');
            elem.classList.remove('jaune');
            elem.classList.remove('rouge');
      }); 
      reponse="";
       liste_de_class =".span-letter-0";
       essai =0;
       Game_over.suppMsg();
       Victoire.suppMsg();
       rejouer_2.removeEventListener('click',rejouer_mm_mot)
       rejouer_2.remove();
       rejouer.removeEventListener('click',rejouer_mm_mot)
       rejouer.remove();
}


function rejouer_autre_mot (){
      $$('.span-letter').forEach(elem => {
            elem.innerText = "";
            elem.classList.remove('vert');
            elem.classList.remove('jaune');
            elem.classList.remove('rouge');
      });
      $$('.LettreDuClavier').forEach(elem => {
            elem.classList.remove('vert');
            elem.classList.remove('jaune');
            elem.classList.remove('rouge');
      }); 
      reponse="";
       liste_de_class =".span-letter-0";
       essai =0;
       Game_over.suppMsg();
       Victoire.suppMsg();
       rejouer_2.removeEventListener('click',rejouer_mm_mot)
       rejouer_2.remove();
       rejouer.removeEventListener('click',rejouer_mm_mot)
       rejouer.remove();

       choisir_mot_a_deviner();
}

