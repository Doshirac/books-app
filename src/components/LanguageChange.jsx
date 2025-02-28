import { useTranslation } from "react-i18next";
import { Box, Typography, Select, MenuItem } from "@mui/material";

export const LanguageChange = () => {
    const { t, i18n } = useTranslation();

    return (
        <Box 
            sx={{ 
                display: "inline-flex", 
                alignItems: "center", 
                gap: 1,
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                px: 1.5,
                py: 0.5
            }}
        >
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {t("book.language")}
            </Typography>
            <Select
                variant="standard"
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                disableUnderline
                size="small"
                sx={{ fontSize: "0.875rem", minWidth: "80px", paddingTop: "1vh" }}
            >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="de">Deutsh</MenuItem>
                <MenuItem value="pl">Polish</MenuItem>
            </Select>
        </Box>
    );
};