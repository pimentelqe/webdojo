## Dicas , Hacks e Trade Offs 

### Simulando MouseOver com Real Events 

cy.contains('Isso é Mouseover!').should('exist')

- arquivo *commands.js*
    import 'cypress-real-events'




### Rodando em headless

npx cypress run

#### Rodando em headed (Assistida)

npx cypress run --headed


### Rodar teste no chrome 

npx cypress run --browser=chrome

npx cypress run --browser=firefox