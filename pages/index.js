import Keyboardist, { useKeyboardBinding } from "../lib";
export default () => {
  useKeyboardBinding("Escape", () => {
    console.log("ESCAPE");
  });
  return (
    <>
      <h1>Hey</h1>
    </>
  );
};
