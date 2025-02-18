// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface ISetArtifactRenderer {
    /**
     * @dev Returns the image URL for a given token ID, edition, and edition index
     * @param id The token ID
     * @param edition The edition number
     * @param editionIndex The index within the edition
     * @return The image URL as a string
     */
    function imageUrl(
        uint256 id,
        uint8 edition,
        uint8 editionIndex
    ) external view returns (string memory);

    /**
     * @dev Returns the animation URL for a given token ID, edition, and edition index
     * @param id The token ID
     * @param edition The edition number
     * @param editionIndex The index within the edition
     * @return The animation URL as a string
     */
    function animationUrl(
        uint256 id,
        uint8 edition,
        uint8 editionIndex
    ) external view returns (string memory);
}
