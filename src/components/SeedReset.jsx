import React from "react";
import { generateRandomSeed } from "../utils/generateRandomSeed";

export const SeedReset = ({ seed, onSeedChange }) => {
    const handleResetSeed = () => {
        const newSeed = generateRandomSeed();
        onSeedChange(newSeed);
    };

    return (
        <div style={{ marginLeft: "16px", display: "flex", alignItems: "center" }}>
        <span>
            <strong>Seed:</strong> {seed}
        </span>
        <button onClick={handleResetSeed} style={{ marginLeft: "8px" }}>
            Reset Seed
        </button>
        </div>
    );
};
