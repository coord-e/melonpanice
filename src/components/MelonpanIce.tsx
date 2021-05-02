import React, { useEffect } from "react";
import styled from "styled-components";
import { useSize } from "../firebase/hooks/melonpanice";
import incrementSize from "../firebase/incrementSize";

type ImgProps = {
  width: number;
  height: number;
};

const Img = styled.img`
  width: ${(props: ImgProps) => `${props.width}vw`};
  height: ${(props: ImgProps) => `${props.height}vw`};
  margin: 0 auto;
  position: absolute;
`;

const Heading1 = styled.h1`
  font-size: 150px;
  color: red;
`;

type Props = {
  incrementCount: () => void;
  axis: "x" | "y" | "both";
};

const MelonpanIce: React.FC<Props> = ({ incrementCount, axis }) => {
  const size = useSize();

  useEffect(() => {
    if (size === null) return;
    const { x, y } = size;
    if (x * y >= 10000) {
      incrementCount();
    }
  }, [size]);

  if (size === null) return null;

  // よく考えたらXとYを持つ必要なかった。
  const { x, y } = size;

  if (x * y > 10000) {
    return <Heading1>爆発</Heading1>;
  }

  return (
    <Img
      width={x}
      height={y}
      src="./logo.png"
      onClick={async () => {
        incrementSize(axis);
      }}
    />
  );
};

export default React.memo(MelonpanIce);
