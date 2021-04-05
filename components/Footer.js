class Footer{  
    create(){
        this.element = document.createElement('footer');
        this.element.classList.add('footer');
        this.element.innerHTML=`
            <div class="container">
                <p>created by Rusan Zhonin</p>
            </div>`  
       
        return this.element
    }

    init(){
       return this.create();        
    }
}

let footer = new Footer().init();

export  {footer}