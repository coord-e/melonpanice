import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import MelonpanIce from "./MelonpanIce";
import { useInitialExplosionCount } from "../firebase/hooks/melonpanice";

const Heading1 = styled.h1`
  position: fixed;
  top: 0;
  text-align: center;
  width: 100vw;
`;

const Main = styled.main`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-flow: column;
  height: 100vh;
  touch-action: manipulation;
`;

function selectAxis(): "x" | "y" | "both" {
  switch (Math.floor(Math.random() * 3)) {
    case 0:
      return "x";
    case 1:
      return "y";
    default:
      return "both";
  }
}

const App = () => {
  const initialCount = useInitialExplosionCount();
  const [count, setCount] = useState(initialCount);
  const [axis, setAxis] = useState<"x" | "y" | "both">("both");

  useEffect(() => {
    setAxis(selectAxis());
  }, []);
  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  const incrementCount = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  if (count === null) return null;

  return (
    <>
      <Main>
        <MelonpanIce incrementCount={incrementCount} axis={axis} />
      </Main>
      <Heading1>
        現在の爆発数: {count}
        <br />
        メロンパンはタップする。
      </Heading1>
    </>
  );
};

export default App;
