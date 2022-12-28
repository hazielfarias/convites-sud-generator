import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  listaConvites = [
    {
      genero: 'Irmão',
      nome: new FormControl(''),
      data: new FormControl(''),
      duracao: new FormControl(''),
      tema: new FormControl(''),
      ordem: new FormControl(''),
    }
  ]

  mensagemControl = new FormControl(`“A verdadeira doutrina, quando compreendida, modifica atitudes e comportamento. O estudo das doutrinas do evangelho melhora o comportamento com mais rapidez do que o estudo do comportamento”
  Presidente Boyd K. Packer
  Presidente do Quórum dos Doze Apóstolos`);

  unidadeControl = new FormControl('');
  horarioControl = new FormControl('');
  anoControl = new FormControl(2023);

  recomendacoesControl = new FormControl(`Recomendações:
  - Sente-se ao púlpito às 9h50m
  - Ensine a pura doutrina de Cristo
  - Utilize os recursos oficiais da Igreja ao ensinar
  - Trate com respeito ao mencionar outras religiões
  - Mantenha uma atitude semelhante a de Cristo ao falar ao púlpito.`);

  formatText(text: string){
    let test = text.split('\n');
    return test.join('<br/>');
  }

  downloadAll() {

    this.listaConvites.forEach((item, index) => {
      let node = document.getElementById(`imagem-${index}`);
      let divImagens = document.getElementById(`imagens-div`);
      if (window.screen.width < 1200) {
        divImagens!.style.display = "inherit";
        divImagens!.style.visibility = "visible";
      }
      
      if (node) htmlToImage.toBlob(node)
        .then((blob) => {
          var url = window.URL.createObjectURL(blob!);
          let a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.href = url;
          a.download = `discurso-${item.nome.value}.png`;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
          if (window.screen.width < 1200) {
            divImagens!.style.display = "none";
            divImagens!.style.visibility = "hidden";
          }
        });
      
    });

  }

  adicionarConvite(){
    this.listaConvites.push({
      genero: 'Irmão',
      nome: new FormControl(''),
      data: new FormControl(''),
      duracao: new FormControl(''),
      tema: new FormControl(''),
      ordem: new FormControl(''),
    });
  }

  excluirConvite(i:number){
    this.listaConvites.splice(i,1);
  }
}
