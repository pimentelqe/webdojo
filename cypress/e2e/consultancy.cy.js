import { personal, company } from '../fixtures/consultancy.json'



describe('Formulario de consultoria', () => {

    beforeEach(() => {
        cy.login()
        cy.goTo('Formulários', 'Consultoria')

        /* 
  Observação: Ao utilizar o fixture com arrow function, ocorre um erro devido ao escopo do `this`. 
  Para resolver esse problema, é necessário usar a função no formato padrão (`function()`), que preserva o contexto correto.
  Com isso, a linha abaixo foi comentada, e os dados foram importados diretamente do arquivo JSON (linha 1).
*/
        //cy.fixture('consultancy').as('consultancyData')

    })

    it('Deve solicitar consultoria indivudal', () => {

        cy.fillConsultancyForm(personal)

        cy.submitConsultancyForm()

        cy.validateConsultancyModal()



    })

    it('Deve solicitar consultoria In Company', () => {
        // const consultancyForm = this.consultancyData.company -- vide comentario acima
        cy.fillConsultancyForm(company)

        cy.submitConsultancyForm()

        cy.validateConsultancyModal()

    })

    it('Deve verificar os campos obrigatorios', () => {
        cy.submitConsultancyForm()
        cy.contains('label', 'Nome Completo')
            .parent()
            .find('p')
            .should('be.visible')
            .and('have.text', 'Campo obrigatório')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.contains('label', 'Email')
            .parent()
            .find('p')
            .should('be.visible')
            .and('have.text', 'Campo obrigatório')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.contains('label', 'termos de uso')
            .parent()
            .find('p')
            .should('be.visible')
            .and('have.text', 'Você precisa aceitar os termos de uso')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')


    })
    afterEach(() => {
        cy.log('Isso acontece apos cada teste')
    })

})


