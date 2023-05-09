describe('/login', async () => {
    const logUrl = 'http://localhost:8080/login';

    it('logs in with valid user', () => {
        const staticTestUser = {
            email: 'validEmail1@bar.com',
            password: 'ValidPass'
        };
        cy.request({
            method: 'GET',
            url: logUrl,
            body: staticTestUser,
        })
            .then((response) => {
                expect(response.status).to.eq(200);
            });
    });

    it('logs in with invalid email', () => {
        const staticTestUser = {
            email: 'invalidemail@bar.com',
            password: 'ValidPass'
        };
        cy.request({
            method: 'GET',
            url: logUrl,
            body: staticTestUser,
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.eq('Email not registered!');
            });
    });

    it('logs in with invalid password', () => {
        const staticTestUser = {
            email: 'validEmail@bar.com',
            password: 'invalid'
        };
        cy.request({
            method: 'GET',
            url: logUrl,
            body: staticTestUser,
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.eq(401);
                expect(response.body).to.eq('Invalid password!');
            });
    });

    it('logs in without body', () => {
        cy.request({
            method: 'GET',
            url: logUrl,
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.eq(400);
            });
    });
});