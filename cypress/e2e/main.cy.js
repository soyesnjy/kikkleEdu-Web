describe('메인 페이지 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('메인 페이지 제목 확인', () => {
    cy.get('h1').should('contain', 'Kids Class Edu');
    cy.get('h4').should('contain', '우리아이의 건강한 몸과 마음의 행복을 위해');
  });

  it('"Read More" 링크 작동 확인', () => {
    cy.get('a').contains('Read More').click();
    cy.url().should('include', '/introduce/content');
    cy.go('back');
  });
});
