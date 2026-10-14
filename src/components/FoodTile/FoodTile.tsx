import React, { ChangeEvent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { CSSProperties } from "@material-ui/styles";

import { CustomTheme } from "../../style/theme";

type ClassNames =
  | "container"
  | "nameContainer"
  | "name"
  | "controls"
  | "value"
  | "button"
  | "input"
  | "image";
interface OwnProps {
  classes: Record<ClassNames, string>;
  imgSrc: string;
  name: string;
  onChange?: (n: number) => void;
  value: number;
}

type Props = OwnProps;

export const FoodTile: React.FC<Props> = (props: Props) => {
  const { classes, imgSrc, name, value, onChange } = props;

  const handleChange = (value: number) => () => {
    if (value < 0) {
      value = 0;
    }
    if (onChange) {
      onChange(value);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChange(Number(event.target.value))();
  };

  return (
    <div className={classes.container}>
      <img src={imgSrc} alt={name} className={classes.image} />
      <div className={classes.nameContainer}>
        <span className={classes.name}>{name}</span>

        <div className={classes.controls}>
          <span className={classes.button} onClick={handleChange(value - 1)}>
            -
          </span>
          {/* <span className={classes.value}>{value || 0}</span> */}
          <input
            value={value}
            onChange={handleInputChange}
            type="number"
            className={classes.input}
          />
          <span className={classes.button} onClick={handleChange(value + 1)}>
            +
          </span>
        </div>
      </div>
    </div>
  );
};

const styles = (theme: CustomTheme): Record<ClassNames, CSSProperties> => ({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: 200
  },
  nameContainer: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(1),
    width: "100%"
  },
  name: {
    color: "black",
    fontWeight: "bold"
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: 6
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    borderRadius: "50%",
    background:
      "transparent linear-gradient(101deg, #F78E0D 0%, #F9C41C 100%) 0% 0% no-repeat padding-box",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 1,
    cursor: "pointer",
    userSelect: "none",
    boxShadow: "0px 2px 8px #00000029",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
    "&:hover": {
      transform: "scale(1.15)",
      boxShadow: "0px 4px 16px #F78E0D66"
    },
    "&:active": {
      transform: "scale(0.92)",
      boxShadow: "0px 1px 4px #00000029"
    }
  },
  image: {
    height: 100
  },
  input: {
    border: "none",
    outline: "none",
    mozAppearance: "textfield",
    width: 36,
    height: 32,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    background: "#f5f5f5",
    borderRadius: 8
  },
  value: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5)
  }
});

export default withStyles(styles)(FoodTile);
