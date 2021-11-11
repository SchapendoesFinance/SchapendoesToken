const {ethers} = require("hardhat")
const {expect} = require("chai")

describe("SchapendoesToken", function () {
    before(async function () {
        this.SchapendoesToken = await ethers.getContractFactory("SchapendoesToken")
        this.signers = await ethers.getSigners()
        this.alice = this.signers[0]
        this.bob = this.signers[1]
        this.carol = this.signers[2]
    })

    beforeEach(async function () {
        this.schapendoes = await this.SchapendoesToken.deploy("SchapendoesToken", "LILY", 1000000000000000, this.alice.address, this.bob.address)
        await this.schapendoes.deployed()
    })

    it("should have correct name and symbol and decimal", async function () {
        const name = await this.schapendoes.name()
        const symbol = await this.schapendoes.symbol()
        expect(name).to.equal("SchapendoesToken")
        expect(symbol).to.equal("LILY")
    })

    it("should send tax to the tax address when transfer", async function () {
        await this.schapendoes.transfer(this.carol.address, 10000);

        const bobBal = await this.schapendoes.balanceOf(this.bob.address)
        const carolBal = await this.schapendoes.balanceOf(this.carol.address)

        expect(bobBal).to.equal("100")
        expect(carolBal).to.equal("9900")
    })
})
