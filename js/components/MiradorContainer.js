import React from "react";

import Image from "./Image";
import miradorLarge from "./images/mirador-3-1.png";

import MiradorViewer from './MiradorViewer';

const MiradorContainer = () => {
  return <Image src={miradorLarge} width={1175} height={797} />;
};

export default MiradorContainer;
