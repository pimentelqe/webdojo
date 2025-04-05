describe('Gerenciamento de perfis no Github', () => {
    beforeEach(() => {
        cy.login()
        cy.goTo('Tabela', 'Perfis do GitHub')
    })

    it('Deve Poder cadastrar um novo perfil do github', () => {
        cy.log('todo')

        cy.get('#name').type('Fernando Pimentel')
        cy.get('#username').type('ferpioli')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', 'ferpioli')
        .should('be.visible')
        .as('trProfile')

        cy.get('@trProfile')
        .contains('Fernando Pimentel')
        .should('be.visible')

       cy.get('@trProfile')
        .contains('QA')
        .should('be.visible')


    })

})