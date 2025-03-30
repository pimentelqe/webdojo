describe('Formulario de consultoria', () => {

    beforeEach(() => {
        cy.login()
        cy.goTo('Formulários', 'Consultoria')

    })

    it('Deve solicitar consultoria indivudal', () => {
        const consultancyForm = {
            name: 'Fernando Pimentel',
            email: 'ferpiolli@gmail.com',
            phone: '31 99999-1000',
            consultancyType: 'Individual',
            personType: 'cpf',
            document: '02885858010',
            discoveryChannels: ['Instagram',
                'LinkedIn',
                'Udemy',
                'YouTube',
                'Indicação de Amigo'],
            file: './cypress/fixtures/document.pdf',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing eli',
            techs: [
                'Cypress',
                'Selenium',
                'WebDriveIO',
                'Playwright',
                'Robot Framework'
            ],
            terms: true

        }


        cy.get('#name').type(consultancyForm.name)
        cy.get('input[placeholder="Digite seu email"]').type(consultancyForm.email)
        cy.get('input[placeholder="(00) 00000-0000"]')
            .type(consultancyForm.phone)
        //.should('have.value', '(31) 98989-8989')
        // xpath -> label[text()="Tipo de Consultoria"]/..//select 
        // cypress não reconhece xpath
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select(consultancyForm.consultancyType)
        //  //span[text()="Pessoa Física"]/..//input

        if (consultancyForm.personType === 'cpf') {
            cy.contains('label', 'Pessoa Física')
                .find('input')
                .check()
                .should('be.checked')

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('be.not.checked')

        }

        if (consultancyForm.personType === 'cnpj') {
            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .check()
                .should('be.checked')

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .should('be.not.checked')

        }


        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type(consultancyForm.document)
        //.should('have.value', '028.858.580-10')



        consultancyForm.discoveryChannels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')

        })
        cy.get('input[type="file"]')
            .selectFile(consultancyForm.file, { force: true })

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"')
            .type(consultancyForm.description)


        consultancyForm.techs.forEach((tech) => {

            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')

        })
        if (consultancyForm.terms === true) {
            cy.contains('label', 'termos de uso')
                .find('input')
                .check()
        }



        cy.contains('button', 'Enviar formulário')
            .click()

        cy.get('.modal', { timeout: 70000 })
            .should('be.visible')
            .find('.modal-content')
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')


    })

    it('Deve solicitar consultoria In Company', () => {
        const consultancyForm = {
            name: 'Fernando Pimentel',
            email: 'ferpiolli@gmail.com',
            phone: '31 99999-1000',
            consultancyType: 'In Company',
            personType: 'cnpj',
            document: '39946868000114',
            discoveryChannels: ['Instagram',
                'LinkedIn'],
            file: './cypress/fixtures/document.pdf',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing eli',
            techs: [
                'Cypress'
            ],
            terms: true

        }
        cy.get('#name').type(consultancyForm.name)
        cy.get('input[placeholder="Digite seu email"]').type(consultancyForm.email)
        cy.get('input[placeholder="(00) 00000-0000"]')
            .type(consultancyForm.phone)
        //.should('have.value', '(31) 98989-8989')
        // xpath -> label[text()="Tipo de Consultoria"]/..//select 
        // cypress não reconhece xpath
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select(consultancyForm.consultancyType)
        //  //span[text()="Pessoa Física"]/..//input

        if (consultancyForm.personType === 'cpf') {
            cy.contains('label', 'Pessoa Física')
                .find('input')
                .check()
                .should('be.checked')

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('be.not.checked')

        }

        if (consultancyForm.personType === 'cnpj') {
            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .check()
                .should('be.checked')

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .should('be.not.checked')

        }

        cy.contains('label', 'CNPJ')
            .parent()
            .find('input')
            .type(consultancyForm.document)
        //.should('have.value', '028.858.580-10')



        consultancyForm.discoveryChannels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')

        })
        cy.get('input[type="file"]')
            .selectFile(consultancyForm.file, { force: true })

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"')
            .type(consultancyForm.description)


        consultancyForm.techs.forEach((tech) => {

            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')

        })
        if (consultancyForm.terms === true) {
            cy.contains('label', 'termos de uso')
                .find('input')
                .check()
        }
        cy.contains('button', 'Enviar formulário')
            .click()

        cy.get('.modal', { timeout: 70000 })
            .should('be.visible')
            .find('.modal-content')
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')

    })

    it('Dece verificar os campos obrigatorios', () => {
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
    afterEach(() => {
        cy.log('Isso acontece apos cada teste')
    })

})


