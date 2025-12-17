import "@testing-library/jest-dom";


beforeAll(() => {
    jest.spyOn(console, "warn").mockImplementation((msg) => {
        if (
          typeof msg === "string" &&
          msg.includes("outdated JSX transform")
        ) {
          return;
        }
        console.warn(msg);
      });
})