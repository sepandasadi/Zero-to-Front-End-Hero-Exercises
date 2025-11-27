// Illustrative only; assumes app serves a /counter page with role="status" and increment button
describe('Counter flow', () => {
  it('increments the counter', () => {
    cy.visit('/counter')
    cy.findByRole('button', { name: /increment/i }).click()
    cy.findByRole('status').should('contain.text', '1')
  })
})
