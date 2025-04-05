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

    })
})