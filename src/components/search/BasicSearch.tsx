import React from "react";

export default function BasicSearch() {
  return (
    <>
      <input type="radio" id="basic" name="toggle" defaultChecked />
      <label htmlFor="basic" id="basic-label">Basic Search</label>
    </>
  );
}

