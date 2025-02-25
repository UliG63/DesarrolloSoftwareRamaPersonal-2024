describe('Debe poder loggearse como mago', () => {
  it('visita la pagina de registro de usuario', () => {
    cy.visit('/');
    cy.contains("Crear Usuario");
  });

  it('navega a la pagina de login', ()=>{
    cy.visit('/');
    cy.get('span[data-testid="ingresar-span"]').click();
    cy.contains('Ingresar');
  });

  it('ingresa como usuario', ()=>{
    cy.visit('/');
    cy.get('span[data-testid="ingresar-span"]').click();
    cy.get('input[data-testid="input-email"]').type('ejemplo@ejemplo.com');
    cy.get('input[data-testid="input-pass1"]').type('ejemplo');
    cy.get('button[data-testid="registrarse-button"]').click();
    cy.contains('Bienvenido al Ministerio de Magia');
  });

  it('rechaza el login', ()=>{
    cy.visit('/');
    cy.get('span[data-testid="ingresar-span"]').click();
    cy.get('input[data-testid="input-email"]').type('nousuario@gmail.com');
    cy.get('input[data-testid="input-pass1"]').type('NONONododni');
    cy.get('button[data-testid="registrarse-button"]').click();
    cy.contains('Error en el inicio de sesion');
  })

})