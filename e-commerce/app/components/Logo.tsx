"use client";
import { faTree } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center space-x-2 text-2xl">
      <FontAwesomeIcon icon={faTree} />
      <span className="text-2xl font-bold">Furniture Forest</span>
    </div>
  );
}
