// Login Page Test Case
describe('Login Page', () => {

  it('should login successfully with correct credentials for Admin', () => {

    cy.visit('http://localhost:3000');

    cy.get("[name='username']").type('admin001');
    cy.get("[name='password']").type('admin@001');

    cy.get("button[type='submit']").click()

    cy.url().should('include', '/admindashboard');
    
  });

  it('should login successfully with correct credentials for Lecture', () => {

    cy.visit('http://localhost:3000');

    cy.get("[name='username']").type('lec001');
    cy.get("[name='password']").type('lec@001');

    cy.get("button[type='submit']").click()

    cy.url().should('include', '/lecturedashboard');
    
  });

  it('should login successfully with correct credentials for Student', () => {

    cy.visit('http://localhost:3000');

    cy.get("[name='username']").type('stu001');
    cy.get("[name='password']").type('stu@001');

    cy.get("button[type='submit']").click()

    cy.url().should('include', '/studentdashboard');
    
  });

  it('should display error message with incorrect credentials', () => {
    
    cy.visit('http://localhost:3000');
    cy.get('[name="username"]').type('admin0010');
    cy.get('[name="password"]').type('admin@0001');

    cy.get("button[type='submit']").click()

    cy.get('#err').should('be.visible').contains('Request failed with status code 401');
  });
});


// Admin Dashboard test Cases
describe('Admin Dashboard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/admindashboard'); 
  });

  it('displays all departments', () => {
    cy.get('.second-row-container .item').should('have.length.greaterThan', -1);
  });

  it('navigates to Dashboard page', () => {
    cy.get('.link').contains('Dashboard').click();
    cy.url().should('include', '/admindashboard');
  });

  it('navigates to Department page', () => {
    cy.get('.link').contains('Department').click();
    cy.url().should('include', '/admin_department');
  });

  it('navigates to Lecturer page', () => {
    cy.get('.link').contains('Lecturer').click();
    cy.url().should('include', '/admin_lecture_details');
  });

  it('navigates to Student page', () => {
    cy.get('.link').contains('Student').click();
    cy.url().should('include', '/admin_student_details');
  });

  it('logs out successfully and redirects to login page', () => {
    cy.get('.link').contains('Logout').click();
  
    cy.url().should('eq', 'http://localhost:3000/'); 
  });
  beforeEach(() => {
    cy.visit('http://localhost:3000/admin_department');
  });


  it('displays error message for already existing department', () => {
  
    cy.get('#departmentCode').type('EE');
    cy.get('#departmentName').type('Example Department');
    cy.get('#numberOfLecturers').type('5');
    cy.get('#numberOfStudents').type('100');

   
    cy.get('.btn-primary[type="submit"]').click();

    cy.get('#err').should('contain.text', 'Department already exists');
  });

  

  
});


// Lecture  Dashboard Test cases
describe('Lecture Dashboard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/lecturedashboard');
  });

  it('should display the logo and university details', () => {
    cy.get('.imagelogo').should('be.visible'); 
    cy.get('.ruhuna-details-font').contains('Faculty of Engineering');
    cy.get('.ruhuna-details-font').contains('University of Ruhuna'); 
  });

  // it("should display modules correctly", () => {
  //   const modulesFixture = [
  //     {
  //       modCode: "CS101",
  //       modName: "Introduction to Computer Science",
  //       noOfStu: 50
  //     },
  //     {
  //       modCode: "EE201",
  //       modName: "Electrical Circuits",
  //       noOfStu: 45
  //     }
  //   ];
  
  //   cy.intercept('GET', 'http://localhost:8070/api/modules/getallmod', {
  //     statusCode: 200,
  //     body: modulesFixture
  //   }).as('getModules');
  
  //   cy.wait('@getModules').then((interception) => {
  //     expect(interception.response.statusCode).to.equal(200);
  
  //     // Retry finding .status-box elements for up to 10 seconds with a 500ms interval
  //     cy.get(".status-box", { timeout: 10000 }).should("have.length", modulesFixture.length);
  
  //     modulesFixture.forEach((module, index) => {
  //       cy.get(`.status-box:eq(${index}) .module-name`).should("contain.text", module.modName);
  //       cy.get(`.status-box:eq(${index}) .student-count`).should("contain.text", module.noOfStu);
  //     });
  //   });
  // });
  
});









// describe('Add Lecturer Page', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:3000/admin_lecture_details');
//   });

//   it('displays added lecturer in the list', () => {
//     const fullName = 'John Doe'; // Replace with the details of the lecturer you're adding
//     const userName = 'johndoe';
//     const password = 'password';
//     const depName = 'computer Engineering Department'; // Assuming this department already exists
//     const regNo = '12345';
//     const imageFile = 'public/Images/profile.webp'; // Path to the image file you want to upload

//     // Fill out the form with new lecturer details
//     cy.get('input[placeholder="FullName"]').type(fullName);
//     cy.get('input[placeholder="Username"]').type(userName);
//     cy.get('input[placeholder="Password"]').type(password);
//     cy.get('.ant-select-selector').click(); // Click on the department select box
//     cy.contains('.ant-select-item-option-content', depName).click(); // Select the department
//     cy.get('input[placeholder="Registration Number"]').type(regNo);
    
//     // Upload profile picture
//     cy.get('input[type="file"]').attachFile(imageFile);

//     // Submit the form
//     cy.contains('button', 'Submit').click();

//     // Check if the added lecturer appears in the list
//     cy.get('.table tbody').should('contain', fullName);
//     cy.get('.table tbody').should('contain', userName);
//     cy.get('.table tbody').should('contain', regNo);
//     cy.get('.table tbody').should('contain', depName);
//   });
// });
