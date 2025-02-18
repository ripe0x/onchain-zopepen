import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { Set014Renderer } from "../typechain-types";
import fs from "fs";
import path from "path";
const editionOneToken = 8546;
const editionFourTokens = [1350, 15223, 5253, 7044];
const editionFiveTokens = [10592, 10623, 1484, 14900, 4815];
const editionTwentyTokens = [
  12395, 13523, 14136, 1987, 2031, 2244, 273, 3673, 4169, 4789, 5113, 5126,
  6016, 6157, 6420, 7216, 8635, 8786, 9571, 973,
];
const editionTenTokens = [
  12688, 15549, 15767, 303, 3064, 3346, 5445, 7027, 8761, 9936,
];
const editionFortyTokens = [
  1040, 10439, 10501, 11649, 11837, 12254, 12491, 1260, 12713, 14032, 14738,
  15370, 15801, 1732, 2137, 231, 2310, 2312, 2485, 2532, 3033, 3106, 3565, 3713,
  3969, 5117, 5828, 6161, 6868, 7017, 7397, 7434, 7934, 7994, 8071, 8277, 833,
  838, 872, 8746,
];
describe("Set014Renderer", function () {
  let renderer: Set014Renderer;
  let deployer: SignerWithAddress;

  // Define the path segments
  const zorbPaths = [
    ethers.toUtf8Bytes(
      '<path d="M79 41h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-19 1h1v1h-1zm4 0h1v1h-1zm-2.051 0h1v1h-1zM80 42h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm-27 1h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-33 1h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm-39 .999h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1z"/>'
    ),
    ethers.toUtf8Bytes(
      '<path d="M89 44.999h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zM66 46h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm-47 1h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-45 1h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm-53 1h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-55 1h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm-60 1h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-51 1h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm-64 .999h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1z"/>'
    ),
    ethers.toUtf8Bytes(
      '<path d="M81 52.999h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zM58 54h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm-69 1h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-61 1h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm-71 1h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-65 1h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm-76 1h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-63 1h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm-78 .999h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1z"/>'
    ),
    ethers.toUtf8Bytes(
      '<path d="M77 60.999h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zM58 62h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm-82 1h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-67 1h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm-85 1h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-69 1h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm-87 1h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-69 1h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-87 .999h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1z"/>'
    ),
    ethers.toUtf8Bytes(
      '<path d="M77 68.999h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zM58 70h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm-90 1h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-71 1h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-93 1h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-73 1h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-91 1h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-69 .999h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1z"/>'
    ),
    ethers.toUtf8Bytes(
      '<path d="M81 75.999h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-93 1h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zM58 78h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-93 1h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-69 1h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-95 1h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-77 1h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm4 0h1v1h-1zm-93 1h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-71 .999h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1z"/>'
    ),
    ethers.toUtf8Bytes(
      '<path d="M85 83.999h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-95 1h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zM62 86h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm4 0h1v1h-1zm-89 1h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-67 1h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-93 1h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-73 1h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm-89 1h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-63 .999h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm4 0h1v1h-1zm-93 1h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-69 1h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zM45 95h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-59 1h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm-93 1h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-65 1h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm-85 1h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-55 .999h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm4 0h1v1h-1zM43 101h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-59 1h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm-77 1h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-49 1h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm-77 1h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-51 1h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm-65 1h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-33 .999h1v1h-1zm4 0h1v1h-1zm-57 1h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zM90 110h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm-53 1h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-80 2h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm4 0h1v1h-1zm-62 1.999h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zM55 117h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm-58 2h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm4 0h1v1h-1zm-66 2h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm-46 1.999h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zM67 125h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm-30 2h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm-46 2h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm-32 4h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1zm4 0h1v1h-1z"/>'
    ),
  ];

  // svg path d attribute values
  const torsoPaths = [
    ethers.toUtf8Bytes(
      "M39 154h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm2-20h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1z"
    ),
    ethers.toUtf8Bytes(
      "M48 153h80v1H48zm-9 7h97v1H39zm0 7h97v1H39zm0 7h97v1H39z"
    ),
    ethers.toUtf8Bytes(
      "M56 153h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm27-18h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm27-18h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm27-18h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm27-18h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm27-18h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm27-18h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm27-18h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm27-18h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm27-18h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-72-18h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm99 0h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1z"
    ),
    ethers.toUtf8Bytes(
      "M41.5 175v-13h1v13h-1Zm7 0v-21h1v21h-1Zm7 0v-21h1v21h-1Zm7 0v-21h1v21h-1Zm7 0v-21h1v21h-1Zm7 0v-21h1v21h-1Zm7 0v-21h1v21h-1Zm7 0v-21h1v21h-1Zm7 0v-21h1v21h-1Zm7 0v-21h1v21h-1Zm7 0v-21h1v21h-1Zm7 0v-21h1v21h-1Zm7 0v-21h1v21h-1Zm7 0v-13h1v13h-1Z"
    ),
    ethers.toUtf8Bytes(
      "M122 155v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm5-20v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm5-15v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm5-10v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm-20-20v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm-5-20v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm-5-20v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm-5-20v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm-5-20v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm-5-20v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm-5-20v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm-5-20v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm-5-20v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm-5-20v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm-5-20v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm-5-20v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm-5-20v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm-5-20v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm-5-20v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm-5-15v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Zm-5-10v-1h1v1h-1Zm0 5v-1h1v1h-1Zm0 5v-1h1v1h-1Z"
    ),
    ethers.toUtf8Bytes(
      "M135 168h-1v1h1zm0-3h-1v1h1zm0-3h-1v1h1zm-1-3h-1v1h1zm1 12h-1v1h1zm0 3h-1v1h1zm-3-17h-1v1h1zm-2-2h-1v1h1zm-3-1h-1v1h1zm-87 14h1v1h-1zm0-3h1v1h-1zm0-3h1v1h-1zm1-3h1v1h-1zm-1 12h1v1h-1zm0 3h1v1h-1zm3-17h1v1h-1zm2-2h1v1h-1zm3-1h1v1h-1zm3 0h1v1h-1zm3 0h1v1h-1zm3 0h1v1h-1zm3 0h1v1h-1zm3 0h1v1h-1zm3 0h1v1h-1zm3 0h1v1h-1zm3 0h1v1h-1zm3 0h1v1h-1zm3 0h1v1h-1zm3 0h1v1h-1zm3 0h1v1h-1zm3 0h1v1h-1zm3 0h1v1h-1zm3 0h1v1h-1zm3 0h1v1h-1zm3 0h1v1h-1zm3 0h1v1h-1zm3 0h1v1h-1zm3 0h1v1h-1zm3 0h1v1h-1zm3 0h1v1h-1zm3 0h1v1h-1zm3 0h1v1h-1zm3 0h1v1h-1z"
    ),
  ];

  before(async function () {
    [deployer] = await ethers.getSigners();

    // Deploy the renderer contract first
    const Set014Renderer = await ethers.getContractFactory("Set014Renderer");
    renderer = await Set014Renderer.deploy();
    await renderer.waitForDeployment();

    // Add path data in separate transactions
    for (const path of zorbPaths) {
      await renderer.addZorbPath(path);
    }

    for (const path of torsoPaths) {
      await renderer.addTorsoPath(path);
    }
  });

  // Helper function to save SVG to file
  const saveSVG = (svg: string, edition: number, index: number) => {
    const dir = path.join(__dirname, "../test-outputs");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(path.join(dir, `edition-${edition}-${index}.svg`), svg);
  };

  // Helper function to decode base64 SVG
  const decodeSVG = (url: string): string => {
    const base64Data = url.split(",")[1];
    return Buffer.from(base64Data, "base64").toString();
  };

  describe("SVG Generation", function () {
    it("should render Edition One (1/1)", async function () {
      const url = await renderer.imageUrl(editionOneToken, 1, 1);
      const svg = decodeSVG(url);
      expect(svg).to.include('viewBox="0 0 175 175"');
      expect(svg).to.include('fill="#000000"'); // Black background
      expect(svg).to.include('fill="#FFFFFF"'); // White shape
      saveSVG(svg, 1, editionOneToken);
    });
    it("should render Edition Four (4/4)", async function () {
      for (let i = 0; i < editionFourTokens.length; i++) {
        const url = await renderer.imageUrl(editionFourTokens[i], 4, i, {
          gasLimit: 30000000,
        });
        const svg = decodeSVG(url);
        expect(svg).to.include('viewBox="0 0 175 175"');
        expect(svg).to.include('fill="#FFFFFF"'); // White background
        saveSVG(svg, 4, editionFourTokens[i]);
      }
    });

    it("should render Edition Five (5/5)", async function () {
      for (let i = 0; i < editionFiveTokens.length; i++) {
        const url = await renderer.imageUrl(editionFiveTokens[i], 5, i, {
          gasLimit: 30000000,
        });
        const svg = decodeSVG(url);
        expect(svg).to.include('viewBox="0 0 175 175"');
        saveSVG(svg, 5, editionFiveTokens[i]);
      }
    });

    it("should render Edition Ten (10/10)", async function () {
      for (let i = 0; i < editionTenTokens.length; i++) {
        const url = await renderer.imageUrl(editionTenTokens[i], 10, i);
        const svg = decodeSVG(url);
        expect(svg).to.include('viewBox="0 0 175 175"');
        saveSVG(svg, 10, editionTenTokens[i]);
      }
    });

    it("should render Edition Twenty (20/20)", async function () {
      for (let i = 0; i < editionTwentyTokens.length; i++) {
        const url = await renderer.imageUrl(editionTwentyTokens[i], 20, i);
        const svg = decodeSVG(url);
        expect(svg).to.include('viewBox="0 0 175 175"');
        saveSVG(svg, 20, editionTwentyTokens[i]);
      }
    });

    it("should render Edition Forty (40/40)", async function () {
      for (let i = 0; i < editionFortyTokens.length; i++) {
        const url = await renderer.imageUrl(editionFortyTokens[i], 40, i);
        const svg = decodeSVG(url);
        expect(svg).to.include('viewBox="0 0 175 175"');
        expect(svg).to.include('fill="#FFFFFF"'); // White shape
        saveSVG(svg, 40, editionFortyTokens[i]);
      }
    });

    it("should reject invalid edition sizes", async function () {
      await expect(renderer.imageUrl(editionOneToken, 2, 0)).to.be.revertedWith(
        "Invalid edition size"
      );
    });

    it("should reject invalid edition indices", async function () {
      await expect(
        renderer.imageUrl(editionOneToken, 40, 99)
      ).to.be.revertedWith("Invalid edition index");
    });
  });

  describe("Animation URLs", function () {
    it("should return empty animation URLs", async function () {
      const url = await renderer.animationUrl(editionOneToken, 1, 0);
      expect(url).to.equal("");
    });
  });

  describe("Color Combinations", function () {
    it("should use correct colors for Edition One", async function () {
      const url = await renderer.imageUrl(editionOneToken, 1, 0);
      const svg = decodeSVG(url);
      expect(svg).to.include('fill="#000000"'); // Black background
      expect(svg).to.include('fill="#FFFFFF"'); // White shape
    });

    it("should use white background for Edition Four", async function () {
      const url = await renderer.imageUrl(editionFourTokens[0], 4, 1);
      const svg = decodeSVG(url);
      expect(svg).to.include('fill="#FFFFFF"'); // White background
    });

    it("should use pastel backgrounds for Edition Five", async function () {
      const url = await renderer.imageUrl(editionFiveTokens[0], 5, 5);
      const svg = decodeSVG(url);
      expect(svg).to.include('fill="#CCFFCC"'); // Pastel background
    });
  });

  describe("Bottom Patterns", function () {
    it("should include correct pattern for Edition One", async function () {
      const url = await renderer.imageUrl(editionOneToken, 1, 0); // Edition One token
      const svg = decodeSVG(url);
      expect(svg).to.include(ethers.toUtf8String(torsoPaths[0]));
    });

    it("should include correct pattern for Edition Four", async function () {
      // Test with any of the Edition Four tokens: 1350, 15223, 5253, 7044
      for (let i = 0; i < editionFourTokens.length; i++) {
        const url = await renderer.imageUrl(editionFourTokens[i], 4, i);
        const svg = decodeSVG(url);
        expect(svg).to.include(ethers.toUtf8String(torsoPaths[1]));
      }
    });

    it("should include correct pattern for Edition Five", async function () {
      // Test with any of the Edition Five tokens: 10592, 10623, 1484, 14900, 4815
      for (let i = 0; i < editionFiveTokens.length; i++) {
        const url = await renderer.imageUrl(editionFiveTokens[i], 5, i);
        const svg = decodeSVG(url);
        expect(svg).to.include(ethers.toUtf8String(torsoPaths[2]));
      }
    });

    it("should include correct pattern for Edition Ten", async function () {
      // Test with any of the Edition Ten tokens: 12688, 15549, 15767, 303, 3064, 3346, 5445, 7027, 8761, 9936
      for (let i = 0; i < editionTenTokens.length; i++) {
        const url = await renderer.imageUrl(editionTenTokens[i], 10, i);
        const svg = decodeSVG(url);
        expect(svg).to.include(ethers.toUtf8String(torsoPaths[3]));
      }
    });

    it("should include correct pattern for Edition Twenty", async function () {
      // Test with any of the Edition Twenty tokens: 12395, 13523, 14136, 1987, 2031, 2244, 273, 3673, 4169, 4789,
      // 5113, 5126, 6016, 6157, 6420, 7216, 8635, 8786, 9571, 973
      for (let i = 0; i < editionTwentyTokens.length; i++) {
        const url = await renderer.imageUrl(editionTwentyTokens[i], 20, i);
        const svg = decodeSVG(url);
        expect(svg).to.include(ethers.toUtf8String(torsoPaths[4]));
      }
    });

    it("should include correct pattern for Edition Forty", async function () {
      // Test with any of the Edition Forty tokens: 1040, 10439, 10501, 11649, 11837, 12254, 12491, 1260, 12713,
      // 14032, 14738, 15370, 15801, 1732, 2137, 231, 2310, 2312, 2485, 2532, 3033, 3106, 3565, 3713, 3969,
      // 5117, 5828, 6161, 6868, 7017, 7397, 7434, 7934, 7994, 8071, 8277, 833, 838, 872, 8746
      for (let i = 0; i < editionFortyTokens.length; i++) {
        const url = await renderer.imageUrl(editionFortyTokens[i], 40, i);
        const svg = decodeSVG(url);
        expect(svg).to.include(ethers.toUtf8String(torsoPaths[5]));
      }
    });
  });

  describe("Ownership", function () {
    let otherAccount: SignerWithAddress;

    beforeEach(async function () {
      [deployer, otherAccount] = await ethers.getSigners();
    });

    it("should set the right owner", async function () {
      expect(await renderer.owner()).to.equal(deployer.address);
    });

    it("should prevent non-owners from adding zorb paths", async function () {
      await expect(
        renderer.connect(otherAccount).addZorbPath(ethers.toUtf8Bytes("test"))
      ).to.be.revertedWithCustomError(renderer, "OwnableUnauthorizedAccount");
    });

    it("should prevent non-owners from adding torso paths", async function () {
      await expect(
        renderer.connect(otherAccount).addTorsoPath(ethers.toUtf8Bytes("test"))
      ).to.be.revertedWithCustomError(renderer, "OwnableUnauthorizedAccount");
    });

    it("should allow owner to add paths", async function () {
      await renderer.addZorbPath(ethers.toUtf8Bytes("test"));
      await renderer.addTorsoPath(ethers.toUtf8Bytes("test"));
    });
  });

  describe("Invalid Token IDs", function () {
    it("should revert for non-existent token IDs", async function () {
      // Test with a token ID that doesn't exist in any edition
      await expect(renderer.imageUrl(99999, 1, 0)).to.be.revertedWith(
        "Invalid token ID"
      );
    });

    it("should revert for token ID zero", async function () {
      await expect(renderer.imageUrl(0, 1, 0)).to.be.revertedWith(
        "Invalid token ID"
      );
    });

    it("should revert for very large token IDs", async function () {
      // Test with a very large number that's clearly outside our range
      const largeTokenId = ethers.MaxUint256;
      await expect(renderer.imageUrl(largeTokenId, 1, 0)).to.be.revertedWith(
        "Invalid token ID"
      );
    });
  });
});
