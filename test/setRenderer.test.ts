// import { expect } from "chai";
// import { ethers } from "hardhat";
// import { Set1Renderer } from "../typechain-types";

// describe("Set1Renderer", function () {
//   let renderer: Set1Renderer;

//   beforeEach(async function () {
//     const Set1Renderer = await ethers.getContractFactory("Set1Renderer");
//     renderer = await Set1Renderer.deploy();
//     await renderer.waitForDeployment();
//   });

//   describe("imageUrl", function () {
//     it("should return the correct mock URL", async function () {
//       const url = await renderer.imageUrl(1, 1, 1);
//       expect(url).to.equal("hello-opepen-set-1");
//     });
//   });

//   describe("animationUrl", function () {
//     it("should return an empty string", async function () {
//       const url = await renderer.animationUrl(1, 1, 1);
//       expect(url).to.equal("");
//     });
//   });
// });
