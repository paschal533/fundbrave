import { MouseEventHandler } from "react";

interface Props {
  btnName: string;
  classStyles: string;
  btnType: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ btnName, classStyles, btnType, handleClick }: Props) => (
  <button
    type="button"
    className={
      btnType === "primary"
        ? `btn-primary ${classStyles}`
        : `btn-outline ${classStyles}`
    }
    onClick={handleClick}
  >
    {btnName}
  </button>
);

export default Button;
