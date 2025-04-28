import React, { ChangeEvent } from "react";
import { CheckCircle, CloudUpload } from "@mui/icons-material";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

type FileInputProp = { 
  name: string; 
  selected: boolean; 
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  accepts: string;
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const FileInput = (props: FileInputProp) => {
  const handleChange = (e: React.FormEvent<HTMLLabelElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      const event = {
        target: target
      } as ChangeEvent<HTMLInputElement>;
      props.onChange(event);
    }
  };

  return (
    <Button
      component="label"
      color={props.selected ? 'success' : 'primary'}
      variant={props.selected ? "contained" : "outlined"}
      tabIndex={-1}
      startIcon={props.selected ? <CheckCircle /> : <CloudUpload />}
      onChange={handleChange}
      sx={{
        transition: 'all 0.2s ease-in-out',
        minWidth: 180,
        '&:hover': {
          transform: 'translateY(-2px)',
        }
      }}
    >
      {props.selected ? 'File Selected' : `Select ${props.name}`}
      <VisuallyHiddenInput type="file" accept={props.accepts} />
    </Button>
  );
};
