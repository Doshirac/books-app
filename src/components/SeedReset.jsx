import { IconButton, Typography } from "@mui/material";
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
        <IconButton onClick={handleResetSeed}>
            <Typography variant="button">🔀</Typography>
        </IconButton>
        </div>
    );
};
