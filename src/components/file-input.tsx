import { CheckBox, SquareOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

type FileInputProp = { name: string; selected: boolean; onChange: Function };

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
      component="label"
      color={props.selected ? 'success': 'primary'}
      variant={props.selected ? "contained" : "outlined"}
      tabIndex={-1}
      startIcon={props.selected ? <CheckBox /> : <SquareOutlined />}
      onChange={(e) => props.onChange(e)}
    >
      {props.name}
      <VisuallyHiddenInput type="file" accept="application/pdf" />
    </Button>
  );
};
