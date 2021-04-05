import {nav} from './Nav.js'
import {cartWidget} from './cartWidget.js'

class Header{   

    create(){
        this.element = document.createElement('header');
        this.element.classList.add('header');

        this.element.innerHTML=`
            <div class="container">
                <div class="logo"><a href="/"><img src="./icons/logo.png"></a></div>
                <a class="tel" href="tel: +375(29)7763477"><img src="./icons/mts.png"></a>
                <a class="tel" href="tel: +375(44)7763477"><img src="./icons/a1.png"></a>
                ${nav.outerHTML}
                ${cartWidget.outerHTML}
            </div>  
        `
        
        return this.element
    }

    init(){
       return this.create();        
    }
}

let header = new Header().init();

export  {header}