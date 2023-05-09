describe('/register', async () => {
    let dynamicEmail = (Math.random() + 1).toString(36).substring(6) + '@bar.com';
    const regUrl = 'http://localhost:8080/register';
    let body = {
            name: 'test',
            email: dynamicEmail,
            password: 'test1234'
        };

    it('create user with valid body', () => {
        cy.request('POST', regUrl, body)
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.name).to.eq('test');
                expect(response.body.email).to.eq(dynamicEmail);
                expect(response.body.password).to.not.eq('test1234');
            });
    });

    it('returns 400 with not correct validation', () => {
        const badValid = {
            name: '1',
            email: 'test',
            password: 'test',
        };
        cy.request({
            method: 'POST',
            url: regUrl,
            body: badValid,
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.eq(400);
            });
    });

    it('returns 400 with invalid name', () => {
        const invalidName = {
            name: '1',
            email: dynamicEmail,
            password: 'ValidPassword',
        };
        cy.request({
            method: 'POST',
            url: regUrl,
            body: invalidName,
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.eq('"name" length must be at least 2 characters long');
            });
    });

    it('returns 400 with invalid email', () => {
        const invalidEmail = {
            name: 'ValidName',
            email: 'InvalidEmail',
            password: 'ValidPassword',
        };
        cy.request({
            method: 'POST',
            url: regUrl,
            body: invalidEmail,
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.eq('"email" must be a valid email');
            });
    });

    it('returns 400 with invalid password', () => {
        const invalidPass = {
            name: 'ValidName',
            email: dynamicEmail,
            password: 'inval',
        };
        cy.request({
            method: 'POST',
            url: regUrl,
            body: invalidPass,
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.eq('"password" length must be at least 6 characters long');
            });
    });

    it('cant create dublicate email', () => {
        const dublicateEmail = {
            name: 'ValidName',
            email: 'InvalidEmail@bar.com',
            password: 'ValidPassword',
        };
        cy.request({
            method: 'POST',
            url: regUrl,
            body: dublicateEmail,
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.eq('Email already registered!');
            });
    });

    it('returns 400 with no body', () => {
        cy.request({
            method: 'POST',
            url: regUrl,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });
});