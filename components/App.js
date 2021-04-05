
class App{

    create(){
        this.app = document.createElement('div');
        this.app.classList.add('app');
        document.body.appendChild(this.app);
    }

    init(){
        import ('./Head.js')
        .then(() =>{

            import('./Data.js')
            .then(data => data.default
                .then(resultData =>{
                    localStorage.setItem('spa',resultData);
                    this.create();
                    import('./Header.js')
                    .then(headerData=>{
                        this.app.appendChild(headerData.header)
                        import('./Main.js')
                        .then(mainData=>{
                            this.app.appendChild(mainData.main);
                            import('./Footer.js')
                            .then(footerData=>{
                                this.app.appendChild(footerData.footer);
                            })
                        })
                    });
  
                }))

        })
     
    }


}

export default new App().init()

