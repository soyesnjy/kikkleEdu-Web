describe('로그인 후 강사 페이지 접근 테스트', () => {
  it('유저가 로그인하고 /teacher 페이지에 접근할 수 있어야 한다', () => {
    // 1. 로그인 페이지로 이동
    cy.visit('/login');

    // 2. 아이디, 비밀번호 입력 및 로그인 버튼 클릭
    cy.get('[data-testid=id-input]').type('njy91');
    cy.get('[data-testid=pwd-input]').type('qwer1234');
    cy.get('[data-testid=login-button]').click();

    // 3. 로그인 성공 후 강사 페이지로 이동
    cy.visit('/teacher');

    // 4. 강사 페이지 접근 여부 확인
    cy.url().should('include', '/teacher');
    cy.contains('강사').should('exist'); // 페이지에 '강사'라는 단어가 있는지 (텍스트는 실제 강사 페이지에 맞게 수정 가능)
  });
});
