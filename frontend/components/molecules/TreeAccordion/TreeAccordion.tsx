// src/components/molecules/TreeAccordion/TreeAccordion.tsx
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { TreeAccordionProps } from "./TreeAccordion.types";

export const TreeAccordion = ({ node }: TreeAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <Box sx={{ pl: 2, borderLeft: "1px solid #ccc" }}>
      {/* Affichage pour les dossiers */}
      {node.type === "directory" && (
        <>
          <Typography
            variant="body1"
            onClick={toggleOpen}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            {node.name} {isOpen ? "-" : "+"}
          </Typography>
          {isOpen && node.children && (
            <Box>
              {node.children.map((child, index) => (
                <TreeAccordion key={index} node={child} />
              ))}
            </Box>
          )}
        </>
      )}

      {/* Affichage pour les fichiers */}
      {node.type === "file" && (
        <Box sx={{ pl: 2 }}>
          <Typography variant="body2">{node.name}</Typography>

          {/* Affichage des classes */}
          {node.classes && node.classes.length > 0 && (
            <Box sx={{ pl: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                Classes:
              </Typography>
              {node.classes.map((cls, index) => (
                <Typography key={index} variant="body2" sx={{ pl: 2 }}>
                  {cls.name}
                </Typography>
              ))}
            </Box>
          )}

          {/* Affichage des fonctions */}
          {node.functions && node.functions.length > 0 && (
            <Box sx={{ pl: 2, mt: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                Functions:
              </Typography>
              {node.functions.map((fn, index) => (
                <Typography key={index} variant="body2" sx={{ pl: 2 }}>
                  {fn.name} ({fn.visibility})
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
