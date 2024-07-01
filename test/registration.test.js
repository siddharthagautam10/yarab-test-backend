const request = require('supertest');
const chai = import('chai');
const expect = chai.expect;
const app = require('../server');

describe('POST /api/register', ()=>{
    it('should register a user successfully', (done)=>{
        request(app)
        .post('/api/register')
        .send({
            firstname: 'Sidd',
            lastname: 'test',
            emai: 'sidd@test.com',
            phone: '01215487855',
            postcode: '0254856'
        })
        .end((err, res)=>{
            expect(res.status).to.equal(201);
            expect(res.body.message).to.equal('Registration successful');
            done();
        });
    });

    it('should return an error for invalid first name', (done)=>{
        request(app)
        .post('/api/register')
        .send({
            firstname: 'Si',
            lastname: 'test',
            emai: 'sidd@test.com',
            phone: '01215487855',
            postcode: '0254856'
        })
        .end((err, res)=>{
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('First name must be at least 3 character long');
            done();
        });
    });


})