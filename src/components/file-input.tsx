import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

type FileInputProp = { name: string, buttonText: string, onChange: Function };

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
  return (
    <Button
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      {props.name}
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => console.log(event.target.files)}
        multiple
      />
    </Button>
  );
};
