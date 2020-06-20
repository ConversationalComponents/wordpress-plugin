import React, { useState, useEffect } from "react";
import { FooterStateful, FooterStatefulParams } from "../footer/FooterStateful";

export function useFooter(p: FooterStatefulParams) {
  const [footer, setFooter] = useState(<FooterStateful {...p} />);

  useEffect(() => {
    setFooter(<FooterStateful {...p} />);
  }, [p.disabled]);

  return footer;
}
