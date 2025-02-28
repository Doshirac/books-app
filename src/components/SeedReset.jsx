import { IconButton, Typography, Box, TextField } from "@mui/material";
import { generateRandomSeed } from "../utils/generateRandomSeed";

export const SeedReset = ({ seed, onSeedChange }) => {
    const handleResetSeed = () => {
        const newSeed = generateRandomSeed();
        onSeedChange(newSeed);
    };

    const handleSeedChange = (e) => {
        onSeedChange(e.target.value);
    };

    return (
        <Box
            sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                px: 1.5,
            }}
        >
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Seed:
            </Typography>
            <TextField
                type="text"
                variant="outlined"
                size="small"
                value={seed}
                onChange={handleSeedChange}
                sx={{
                    width: 90,
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            border: "none",
                        },
                    },
                }}
            />
            <IconButton onClick={handleResetSeed} size="small">
                <Typography variant="button">🔀</Typography>
            </IconButton>
        </Box>
    );
};
