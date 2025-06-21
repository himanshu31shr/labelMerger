import React, { ChangeEvent, useId } from "react";
import { CheckCircle, CloudUpload } from "@mui/icons-material";
import { Button } from "@mui/material";

type FileInputProp = { 
  name: string; 
  selected: boolean;
  fileCount?: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  accepts: string;
  multiple?: boolean;
};

export const FileInput = (props: FileInputProp) => {
  const inputId = useId();
  
  const getButtonLabel = () => {
    if (!props.selected) {
      return `Select ${props.name}`;
    }
    
    if (props.fileCount && props.fileCount > 1) {
      return `${props.fileCount} Files Selected`;
    }
    
    return 'File Selected';
  };

  return (
    <>
      <input
        id={inputId}
        accept={props.accepts}
        style={{ display: 'none' }}
        type="file"
        onChange={props.onChange}
        multiple={props.multiple}
      />
      <label htmlFor={inputId}>
        <Button
          component="span"
          color={props.selected ? 'success' : 'primary'}
          variant={props.selected ? "contained" : "outlined"}
          tabIndex={-1}
          startIcon={props.selected ? <CheckCircle /> : <CloudUpload />}
          sx={{
            transition: 'all 0.2s ease-in-out',
            minWidth: 180,
            '&:hover': {
              transform: 'translateY(-2px)',
            }
          }}
        >
          {getButtonLabel()}
        </Button>
      </label>
    </>
  );
};
