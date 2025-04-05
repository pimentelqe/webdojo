Cypress.Commands.add('fillConsultancyForm', (form) => {
    //const consultancyForm = this.consultancyData.personal -- vide comentario acima

    cy.get('#name').type(form.name)
    cy.get('input[placeholder="Digite seu email"]').type(form.email)
    cy.get('input[placeholder="(00) 00000-0000"]')
        .type(form.phone)
    //.should('have.value', '(31) 98989-8989')
    // xpath -> label[text()="Tipo de Consultoria"]/..//select 
    // cypress não reconhece xpath
    cy.contains('label', 'Tipo de Consultoria')
        .parent()
        .find('select')
        .select(form.consultancyType)
    //  //span[text()="Pessoa Física"]/..//input

    if (form.personType === 'cpf') {
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
            .type(form.document)
        //.should('have.value', '028.858.580-10')

    }

    if (form.personType === 'cnpj') {
        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .check()
            .should('be.checked')

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .should('be.not.checked')

        cy.contains('label', 'CNPJ')
            .parent()
            .find('input')
            .type(form.document)
        //.should('have.value', '028.858.580-10')

    }

    form.discoveryChannels.forEach((channel) => {
        cy.contains('label', channel)
            .find('input')
            .check()
            .should('be.checked')

    })
    cy.get('input[type="file"]')
        .selectFile(form.file, { force: true })

    cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"')
        .type(form.description)


    form.techs.forEach((tech) => {

        cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
            .type(tech)
            .type('{enter}')

        cy.contains('label', 'Tecnologias')
            .parent()
            .contains('span', tech)
            .should('be.visible')

    })
    if (form.terms === true) {
        cy.contains('label', 'termos de uso')
            .find('input')
            .check()
    }

})

Cypress.Commands.add('submitConsultancyForm', () => {
    cy.contains('button', 'Enviar formulário')
        .click()

})
Cypress.Commands.add('validateConsultancyModal', () => {
    cy.get('.modal', { timeout: 70000 })
        .should('be.visible')
        .find('.modal-content')
        .should('be.visible')
        .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')

})