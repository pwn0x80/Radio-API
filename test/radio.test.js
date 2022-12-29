const expect = require("chai").expect;
const app = require("../routes/radioList.route")

const server = require("../index")
let chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

describe("api",()=>{
let request = chai.request(app).keepOpen()
  describe("api/baseurl",()=>{
    it("baseurl",function(done){ 
      chai.request(server)
      .get("/baseurl")
      .end((err,res)=>{
          expect(res.text).to.be.a('string')
          expect(res.text).to.match(/^https:\/\/[a-zA-Z0-9@:%._\+~#=-]{1,255}.info$/)
          done();
        })
    })
  })


  describe("/genres",()=>{
    it("genres list fetching", function(done){
      chai.request(server)
      .get('/')
      .end((err,res)=>{
      expect(res.body).to.be.an("array")
      done()
      })
    })
  })
})
