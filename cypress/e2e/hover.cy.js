describe('simulando Mouseover',()=> {
    it('Deve mostrar um texto ao passar o mouse em cima do link do instagram', ()=> {
        //cy.start() 
        cy.contains('Isso é Mouseover!').should('not.exist')
        cy.login()
       // cy.submitLoginForm('papito@webdojo.com','katana123')
        cy.get('[data-cy="instagram-link"]').realHover()
            cy.contains('Isso é Mouseover!').should('exist')
        

    })
    

})