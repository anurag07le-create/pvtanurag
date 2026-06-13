"use client";

import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

/**
 * The scrolling road. Uses the real illustrated road (dirt path + flower
 * hedges) as a seamless vertical tile — road-tile.png is the road stacked
 * above its own vertical mirror, so background-repeat: repeat-y never shows
 * a seam. As you scroll, the texture flows downward = the car drives forward.
 */
export default function Road({ progress }: { progress: MotionValue<number> }) {
  // The car faces upward, so the ground flows DOWN for the car to read as
  // driving forward (perceived motion is opposite the ground scroll).
  const posY = useTransform(progress, [0, 0.75], ["0px", "3600px"]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#5e3f22]">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/images/journey/road-tile.jpg)",
          backgroundRepeat: "repeat-y",
          backgroundSize: "100% auto",
          backgroundPositionX: "center",
          backgroundPositionY: posY,
        }}
      />

      {/* Soft top/bottom fade so the car and text read cleanly */}
      <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-[#3a2417]/55 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-[#3a2417]/55 to-transparent pointer-events-none" />
      {/* Gentle edge vignette for depth */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_30px_rgba(30,16,6,0.35)]" />
    </div>
  );
}
