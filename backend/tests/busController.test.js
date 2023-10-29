const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Assuming your Express app is in 'app.js'
const { expect } = chai;

chai.use(chaiHttp);

describe('Bus Controller', () => {
    let testBusId; // To store the ID of the test bus for later use

    // Test case 1: Positive test case - Add a new bus
    it('should add a new bus', (done) => {
        chai.request(app)
            .post('/api/addBus')
            .send({
                licenceNo: 'BUS123',
                capacity: 50,
                plateNo: 'ABC123',
                currentPassenger: 20
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal('Bus record saved successfully');
                // Store the test bus ID for later use in other test cases
                testBusId = res.body.id;
                done();
            });
    });

    // Test case 2: Negative test case - Try to get a non-existing bus
    it('should return "Bus with the given ID not found"', (done) => {
        chai.request(app)
            .get(`/api/getBus/nonExistingBusId`)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.text).to.equal('Bus with the given ID not found');
                done();
            });
    });

    // Test case 3: Positive test case - Update an existing bus
    it('should update an existing bus', (done) => {
        chai.request(app)
            .put(`/api/updateBus/${testBusId}`)
            .send({
                capacity: 60,
                currentPassenger: 25
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal('Bus record updated successfully');
                done();
            });
    });
});
