describe('Links abrindo nova guia/janela',()=>{
    it('valdando o atributo do link do instagram', ()=> {
        cy.start() 
        cy.submitLoginForm('papito@webdojo.com', 'katana123')

        cy.get('[data-cy="instagram-link"]')
        .should('have.attr','href' ,'https://www.instagram.com/qapapito')
        .and('have.attr', 'target', '_blank')

    })
    it.only('Acessa link de termos de uso removendo o target _blank ', ()=> {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')

        cy.contains('Formulários').click()

        cy.contains('a','termos de uso')
        .invoke('removeAttr', 'target' )
        .click()

        cy.contains('Ao acessar e usar nossos serviços, você concorda em cumprir estes termos de uso. Se você não concordar com algum aspecto destes termos, não utilize nossos serviços.')
        .should('be.visible')


    })
})