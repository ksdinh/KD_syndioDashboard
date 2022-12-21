describe('syndioDashboard', () => {

  it('Group Names & Ids', () => {
    cy.request("GET", "https://run.mocky.io/v3/9e343425-c47c-4c7f-a1ac-972c099be0ed", {
    }).then((res) => {
      console.log(res);
      expect(res.status).to.eq(200);
      expect(res.body[0].label).to.equal('Group by Function');
      expect(res.body[1].label).to.equal('Group by Role');
    });
  })
  it('Group by Function', () => {
    cy.request("GET", "https://run.mocky.io/v3/a9f6a4b7-d03c-4a45-b64b-791e054f36b8", {
    }).then((res) => {
      console.log(res);
      expect(res.status).to.eq(200);
      expect(res.body.data.gender.payEquityGap.data.majority.value).to.equal('$1');
      expect(res.body.data.gender.payEquityGap.data.minority.value).to.equal('96¢');
      expect(res.body.data.gender.employeeComparison.data.value).to.equal('41%');
      expect(res.body.data.gender.budget.data.value).to.equal('$235,000');
      expect(res.body.data.race.payEquityGap.data.majority.value).to.equal('$1');
      expect(res.body.data.race.payEquityGap.data.minority.value).to.equal('86¢');
      expect(res.body.data.race.employeeComparison.data.value).to.equal('21%');
      expect(res.body.data.race.budget.data.value).to.equal('$535,000');

    });
  })
  it('Group by Role', () => {
    cy.request("GET", "https://run.mocky.io/v3/f1b01b57-3147-476a-a632-0c10ad2a3c1a", {
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data.gender.payEquityGap.data.majority.value).to.equal('$1');
      expect(res.body.data.gender.payEquityGap.data.minority.value).to.equal('97¢');
      expect(res.body.data.gender.employeeComparison.data.value).to.equal('47%');
      expect(res.body.data.gender.budget.data.value).to.equal('$135,000');
      expect(res.body.data.race.payEquityGap.data.majority.value).to.equal('$1');
      expect(res.body.data.race.payEquityGap.data.minority.value).to.equal('87¢');
      expect(res.body.data.race.employeeComparison.data.value).to.equal('24%');
      expect(res.body.data.race.budget.data.value).to.equal('$547,000');

    })
  })
  it('Validate Page Elements', () => {
    cy.visit('http://localhost:3000/?group=a9f6a4b7-d03c-4a45-b64b-791e054f36b8')
    cy.get('#root > div > div.header > img').should('be.visible');
    cy.get('#tab-gender > button').should('be.visible');
    cy.get('#tab-race > button').should('be.visible');
    cy.get('#payEquityGap').should('be.visible');
    cy.get('#employeeComparison').should('be.visible');
    cy.get('#budget').should('be.visible');

    cy.get('#tab-gender > button').should('be.visible').click();
    expect(cy.get('#payEquityGap > p').should('be.visible').contains('Women'));

    cy.get('#dropdown-button').should('be.visible').click();
    expect(cy.get('#root > div > div.header > div > ul > li.labelOption').should('be.visible').contains('CHANGE GROUP'));
    expect(cy.get('#a9f6a4b7-d03c-4a45-b64b-791e054f36b8').should('be.visible').contains('Group by Function'));
    expect(cy.get('#root > div > div.header > div').should('be.visible').contains('Group by Role'));
    cy.get('#f1b01b57-3147-476a-a632-0c10ad2a3c1a').should('be.visible').click();

    cy.get('#tab-race > button').should('be.visible').click();
    expect(cy.get('#payEquityGap > p').should('be.visible').contains('Asians'));
  })

  const sizes = ['iphone-x', 'ipad-2', 'samsung-s10', [1920, 1080]]
  sizes.forEach((size) => {

    it(`Validates Dashboard for ${size}`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
      } else {
        cy.viewport(size)
      }
      cy.visit('http://localhost:3000/?group=a9f6a4b7-d03c-4a45-b64b-791e054f36b8')
      cy.get('#budget').should('be.visible');
      cy.get('#employeeComparison');
      cy.get('#dropdown-button').should('be.visible').click();
      expect(cy.get('#root > div > div.header > div').should('be.visible').contains('Group by Role'));

    })
  })
})