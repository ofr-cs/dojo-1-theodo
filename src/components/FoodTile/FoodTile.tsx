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
  | "imageWrapper"
  | "image"
  | "animSushi"
  | "animMaki"
  | "animCalifornia"
  | "animMiso"
  | "animViande"
  | "animBoeufFromage"
  | "misoTopping"
  | "misoRipple"
  | "meatPiece"
  | "cheeseDrip"
  | "steam1"
  | "steam2";

const FOOD_ANIMATIONS: Record<string, ClassNames> = {
  Sushi: "animSushi",
  Maki: "animMaki",
  California: "animCalifornia",
  "Soupe Miso": "animMiso",
  Viande: "animViande",
  "Boeuf Fromage": "animBoeufFromage",
};
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

  const animClass = FOOD_ANIMATIONS[name];
  const wrapperClass = animClass
    ? `${classes.imageWrapper} ${classes[animClass]}`
    : classes.imageWrapper;

  return (
    <div className={classes.container}>
      <div className={wrapperClass}>
        <img src={imgSrc} alt={name} className={classes.image} />
        {name === "Soupe Miso" && (
          <>
            <div className={classes.misoTopping} />
            <div className={classes.misoRipple} />
          </>
        )}
        {name === "Viande" && <div className={classes.meatPiece} />}
        {name === "Boeuf Fromage" && (
          <>
            <div className={classes.cheeseDrip} />
            <div className={classes.steam1} />
            <div className={classes.steam2} />
          </>
        )}
      </div>
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
  imageWrapper: {
    position: "relative",
    display: "inline-block",
    cursor: "pointer",
    transition: "transform 0.2s ease",
    "&:hover": {
      transform: "scale(1.06)"
    }
  },
  image: {
    height: 100,
    display: "block",
    transformOrigin: "center"
  },
  animSushi: {
    "&:hover $image": {
      animation: "food-sushi-flip 0.7s ease"
    }
  },
  animMaki: {
    "&:hover $image": {
      animation: "food-maki-hop 1s ease-in-out infinite"
    }
  },
  animCalifornia: {
    "&:hover $image": {
      animation: "food-california-wave 1.2s ease-in-out infinite"
    }
  },
  animMiso: {
    "&:hover $misoTopping": {
      animation: "food-miso-dive 1.2s ease-in forwards"
    },
    "&:hover $misoRipple": {
      animation: "food-miso-ripple 0.8s ease-out 0.5s"
    }
  },
  animViande: {
    "&:hover $meatPiece": {
      animation: "food-viande-fall 1s ease-in forwards"
    }
  },
  animBoeufFromage: {
    "&:hover $image": {
      animation: "food-sizzle 0.5s ease-in-out infinite"
    },
    "&:hover $cheeseDrip": {
      animation: "food-cheese-drip 2.2s ease-in-out"
    },
    "&:hover $steam1": {
      animation: "food-steam-rise 2s ease-out infinite"
    },
    "&:hover $steam2": {
      animation: "food-steam-rise 2s ease-out 0.7s infinite"
    }
  },
  misoTopping: {
    position: "absolute",
    top: -8,
    left: "50%",
    width: 16,
    height: 16,
    marginLeft: -8,
    borderRadius: 4,
    background: "linear-gradient(135deg, #FFFDE7 0%, #FFF9C4 100%)",
    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
    opacity: 0,
    pointerEvents: "none",
    zIndex: 2
  },
  misoRipple: {
    position: "absolute",
    top: 40,
    left: "50%",
    width: 36,
    height: 10,
    marginLeft: -18,
    marginTop: -5,
    borderRadius: "50%",
    border: "2px solid rgba(255,255,255,0.6)",
    opacity: 0,
    pointerEvents: "none"
  },
  meatPiece: {
    position: "absolute",
    top: "30%",
    right: "22%",
    width: 16,
    height: 12,
    borderRadius: 3,
    background: "linear-gradient(135deg, #8B4513 0%, #A0522D 100%)",
    boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
    opacity: 0,
    pointerEvents: "none"
  },
  cheeseDrip: {
    position: "absolute",
    top: "40%",
    left: "50%",
    width: 8,
    marginLeft: -4,
    borderRadius: "0 0 4px 4px",
    background: "linear-gradient(180deg, #FFD54F 0%, #FF8F00 100%)",
    opacity: 0,
    pointerEvents: "none"
  },
  steam1: {
    position: "absolute",
    top: "15%",
    left: "30%",
    width: 10,
    height: 20,
    borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
    background: "rgba(255,255,255,0.25)",
    filter: "blur(4px)",
    opacity: 0,
    pointerEvents: "none"
  },
  steam2: {
    position: "absolute",
    top: "20%",
    left: "55%",
    width: 8,
    height: 16,
    borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
    background: "rgba(255,255,255,0.2)",
    filter: "blur(3px)",
    opacity: 0,
    pointerEvents: "none"
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
