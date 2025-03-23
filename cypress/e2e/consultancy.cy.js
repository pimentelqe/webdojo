describe('Formulario de consultoria', () => {
    it.only('Deve solicitar consultoria indivudal', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')
        cy.goTo('Formulários', 'Consultoria')
        cy.get('#name').type('Fernando Pimentel')
        cy.get('input[placeholder="Digite seu email"]').type('ferpiolli@gmail.com')
        cy.get('input[placeholder="(00) 00000-0000"]')
            .type('31989898989')
            .should('have.value', '(31) 98989-8989')
        // xpath -> label[text()="Tipo de Consultoria"]/..//select 
        // cypress não reconhece xpath
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select('Individual')
        //  //span[text()="Pessoa Física"]/..//input

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .check()
            .should('be.checked')


        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked')

        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type('02885858010')
            .should('have.value', '028.858.580-10')

        const discoveryChannels = ['Instagram',
            'LinkedIn',
            'Udemy',
            'YouTube',
            'Indicação de Amigo']

        discoveryChannels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')

        })
        cy.get('input[type="file"]')
            .selectFile('./cypress/fixtures/document.pdf', { force: true })

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"')
            .type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')


        const techs = [
            'Cypress',
            'Selenium',
            'WebDriveIO',
            'Playwright',
            'Robot Framework'
        ]
        techs.forEach((tech) => {

            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')

        })

        cy.contains('label', 'termos de uso')
            .find('input')
            .check()

        cy.contains('button', 'Enviar formulário')
            .click()

            cy.get('.modal')
            .should('be.visible')
            .find('.modal-content')
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')


       /* cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
            .should('be.visible')
            */

    })
    it('Dece verificar os campos obrigatorios', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')
        cy.goTo('Formulários', 'Consultoria')
        cy.contains('button', 'Enviar formulário')
            .click()


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
})


