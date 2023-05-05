import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";

chai.use(chaiHttp);
chai.should();

describe("Clinic Search API", () => {
  it("should return clinic details when called with name query parameter", (done) => {
    chai
      .request(app)
      .get("/clinic-search?name=good")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("status").eql(200);
        res.body.should.have.property("message").eql("success");
        res.body.should.have.property("data");
        res.body.data.should.be.an("array");
        res.body.data.should.have.length(2);
        res.body.data[0].should.have.property("name").eql("Good Health Home");
        res.body.data[0].should.have.property("stateName").eql("Alaska");
        res.body.data[0].should.have.property("availability").to.deep.equal({
          from: "10:00",
          to: "19:30",
        });
        res.body.data[1].should.have.property("name").eql("Good Health Home");
        res.body.data[1].should.have.property("stateName").eql("FL");
        res.body.data[1].should.have.property("isVet").eql(1);
        res.body.data[1].should.have.property("availability").to.deep.equal({
          from: "15:00",
          to: "20:00",
        });
        done();
      });
  });
});
