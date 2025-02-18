// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ISetArtifactRenderer} from "./interfaces/ISetArtifactRenderer.sol";

contract Set014Renderer is ISetArtifactRenderer, Ownable {
    struct ColorPair {
        bytes3 background;
        bytes3 shape;
    }

    mapping(uint256 => ColorPair) private colorPairs;
    bytes[] private zorbPaths;
    bytes[] private torsoPaths;

    constructor() Ownable(msg.sender) {
        // Assign color pairs to token IDs
        // Edition One (1/1)
        colorPairs[8546] = ColorPair(hex"000000", hex"FFFFFF");

        // Edition Four (4/4)
        colorPairs[1350] = ColorPair(hex"FFFFFF", hex"0000EE");
        colorPairs[15223] = ColorPair(hex"FFFFFF", hex"800080");
        colorPairs[5253] = ColorPair(hex"FFFFFF", hex"808000");
        colorPairs[7044] = ColorPair(hex"FFFFFF", hex"EE0000");

        // Edition Five (5/5)
        colorPairs[10592] = ColorPair(hex"CCFFCC", hex"006600");
        colorPairs[10623] = ColorPair(hex"FFFF99", hex"CC6600");
        colorPairs[1484] = ColorPair(hex"FFCCFF", hex"6633FF");
        colorPairs[14900] = ColorPair(hex"99FFFF", hex"0066CC");
        colorPairs[4815] = ColorPair(hex"FFCCCC", hex"FF0000");

        // Edition Ten (10/10)
        colorPairs[12688] = ColorPair(hex"003333", hex"CCFF33");
        colorPairs[15549] = ColorPair(hex"000099", hex"66CCFF");
        colorPairs[15767] = ColorPair(hex"FF6600", hex"FFFF00");
        colorPairs[303] = ColorPair(hex"336633", hex"CCFF33");
        colorPairs[3064] = ColorPair(hex"660099", hex"FF00FF");
        colorPairs[3346] = ColorPair(hex"800000", hex"FF0000");
        colorPairs[5445] = ColorPair(hex"666600", hex"CCFF33");
        colorPairs[7027] = ColorPair(hex"0000EE", hex"33CCFF");
        colorPairs[8761] = ColorPair(hex"000066", hex"FF00FF");
        colorPairs[9936] = ColorPair(hex"663333", hex"FFCC66");

        // Edition Twenty (20/20)
        colorPairs[12395] = ColorPair(hex"990000", hex"FFFF99");
        colorPairs[13523] = ColorPair(hex"663399", hex"00FFFF");
        colorPairs[14136] = ColorPair(hex"FF0066", hex"FFFF00");
        colorPairs[1987] = ColorPair(hex"FF6600", hex"FFFF00");
        colorPairs[2031] = ColorPair(hex"996600", hex"00FF00");
        colorPairs[2244] = ColorPair(hex"6633CC", hex"CCFF00");
        colorPairs[273] = ColorPair(hex"3333CC", hex"FFFF00");
        colorPairs[3673] = ColorPair(hex"0066FF", hex"CCFF00");
        colorPairs[4169] = ColorPair(hex"0099FF", hex"CCFF33");
        colorPairs[4789] = ColorPair(hex"FFCC00", hex"FF0000");
        colorPairs[5113] = ColorPair(hex"9933CC", hex"CCFFFF");
        colorPairs[5126] = ColorPair(hex"003366", hex"00FF00");
        colorPairs[6016] = ColorPair(hex"000066", hex"CCFF00");
        colorPairs[6157] = ColorPair(hex"0600FE", hex"FF0066");
        colorPairs[6420] = ColorPair(hex"009900", hex"99FFFF");
        colorPairs[7216] = ColorPair(hex"336600", hex"FF99FF");
        colorPairs[8635] = ColorPair(hex"6633FF", hex"FFFF00");
        colorPairs[8786] = ColorPair(hex"020AF4", hex"74FA55");
        colorPairs[9571] = ColorPair(hex"663366", hex"FF00FF");
        colorPairs[973] = ColorPair(hex"FF00FF", hex"00CCFF");

        // Edition Forty (40/40)
        colorPairs[1040] = ColorPair(hex"0000FF", hex"FFFFFF");
        colorPairs[10439] = ColorPair(hex"999966", hex"FFFFFF");
        colorPairs[10501] = ColorPair(hex"6633FF", hex"FFFFFF");
        colorPairs[11649] = ColorPair(hex"660000", hex"FFFFFF");
        colorPairs[11837] = ColorPair(hex"339966", hex"FFFFFF");
        colorPairs[12254] = ColorPair(hex"6666CC", hex"FFFFFF");
        colorPairs[12491] = ColorPair(hex"0066CC", hex"FFFFFF");
        colorPairs[1260] = ColorPair(hex"CC6600", hex"FFFFFF");
        colorPairs[12713] = ColorPair(hex"6633CC", hex"FFFFFF");
        colorPairs[14032] = ColorPair(hex"666699", hex"FFFFFF");
        colorPairs[14738] = ColorPair(hex"CC00CC", hex"FFFFFF");
        colorPairs[15370] = ColorPair(hex"9966FF", hex"FFFFFF");
        colorPairs[15801] = ColorPair(hex"999900", hex"FFFFFF");
        colorPairs[1732] = ColorPair(hex"CC3300", hex"FFFFFF");
        colorPairs[2137] = ColorPair(hex"3399FF", hex"FFFFFF");
        colorPairs[231] = ColorPair(hex"FF6600", hex"FFFFFF");
        colorPairs[2310] = ColorPair(hex"0000CC", hex"FFFFFF");
        colorPairs[2312] = ColorPair(hex"CC0066", hex"FFFFFF");
        colorPairs[2485] = ColorPair(hex"666600", hex"FFFFFF");
        colorPairs[2532] = ColorPair(hex"CC9933", hex"FFFFFF");
        colorPairs[3033] = ColorPair(hex"3366FF", hex"FFFFFF");
        colorPairs[3106] = ColorPair(hex"FF00FF", hex"FFFFFF");
        colorPairs[3565] = ColorPair(hex"CC3366", hex"FFFFFF");
        colorPairs[3713] = ColorPair(hex"990000", hex"FFFFFF");
        colorPairs[3969] = ColorPair(hex"FF0000", hex"FFFFFF");
        colorPairs[5117] = ColorPair(hex"9900CC", hex"FFFFFF");
        colorPairs[5828] = ColorPair(hex"666666", hex"FFFFFF");
        colorPairs[6161] = ColorPair(hex"6600CC", hex"FFFFFF");
        colorPairs[6868] = ColorPair(hex"CC6666", hex"FFFFFF");
        colorPairs[7017] = ColorPair(hex"00CCCC", hex"FFFFFF");
        colorPairs[7397] = ColorPair(hex"FF3300", hex"FFFFFF");
        colorPairs[7434] = ColorPair(hex"CC33FF", hex"FFFFFF");
        colorPairs[7934] = ColorPair(hex"000066", hex"FFFFFF");
        colorPairs[7994] = ColorPair(hex"00CC00", hex"FFFFFF");
        colorPairs[8071] = ColorPair(hex"660066", hex"FFFFFF");
        colorPairs[8277] = ColorPair(hex"009900", hex"FFFFFF");
        colorPairs[833] = ColorPair(hex"006666", hex"FFFFFF");
        colorPairs[838] = ColorPair(hex"66CC00", hex"FFFFFF");
        colorPairs[872] = ColorPair(hex"3399FF", hex"FFFFFF");
        colorPairs[8746] = ColorPair(hex"006600", hex"FFFFFF");
    }

    function imageUrl(
        uint256 id,
        uint8 edition,
        uint8 editionIndex
    ) external view returns (string memory) {
        require(editionIndex < 80, "Invalid edition index");
        require(
            edition == 1 ||
                edition == 4 ||
                edition == 5 ||
                edition == 10 ||
                edition == 20 ||
                edition == 40,
            "Invalid edition size"
        );

        ColorPair memory colors = colorPairs[id];
        require(
            colors.background != 0 || colors.shape != 0,
            "Invalid token ID"
        );

        return
            string(
                abi.encodePacked(
                    "data:image/svg+xml;base64,",
                    Base64.encode(
                        abi.encodePacked(
                            '<svg width="2400" height="2400" viewBox="0 0 175 175" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">',
                            '<rect width="2400" height="2400" fill="',
                            _formatColor(colors.background),
                            '"/>',
                            '<g fill="',
                            _formatColor(colors.shape),
                            '">',
                            _getPrecomputedPath(),
                            '<path d="',
                            _getBottomPattern(edition),
                            '" /></g></svg>'
                        )
                    )
                )
            );
    }

    function _formatColor(bytes3 color) internal pure returns (string memory) {
        bytes memory str = new bytes(7);
        str[0] = "#";
        bytes memory alphabet = "0123456789ABCDEF";
        for (uint256 i = 0; i < 3; i++) {
            str[i * 2 + 1] = alphabet[uint8(color[i] >> 4)];
            str[i * 2 + 2] = alphabet[uint8(color[i] & 0x0f)];
        }
        return string(str);
    }

    function _getPrecomputedPath() internal view returns (bytes memory) {
        bytes memory completePath;
        for (uint i = 0; i < zorbPaths.length; i++) {
            completePath = abi.encodePacked(completePath, zorbPaths[i]);
        }
        return completePath;
    }

    function _getBottomPattern(
        uint8 edition
    ) internal view returns (bytes memory) {
        if (edition == 1) {
            return torsoPaths[0];
        } else if (edition == 4) {
            return torsoPaths[1];
        } else if (edition == 5) {
            return torsoPaths[2];
        } else if (edition == 10) {
            return torsoPaths[3];
        } else if (edition == 20) {
            return torsoPaths[4];
        }
        return torsoPaths[5];
    }

    function animationUrl(
        uint256 id,
        uint8 edition,
        uint8 editionIndex
    ) external pure returns (string memory) {
        return "";
    }

    // Owner functions to add path data
    function addZorbPath(bytes calldata path) external onlyOwner {
        zorbPaths.push(path);
    }

    function addTorsoPath(bytes calldata path) external onlyOwner {
        torsoPaths.push(path);
    }
}
