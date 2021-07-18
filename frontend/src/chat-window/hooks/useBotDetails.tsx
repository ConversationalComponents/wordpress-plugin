import React, { useEffect, useState } from "react";

import { CoCoChatWindowParams } from "../types";

export const useBotDetails = (params: CoCoChatWindowParams) => {
  const [avatar, setAvatar] = useState(
    "https://storage.googleapis.com/coco_public/avatars/profiles/lali1.png"
  );
  const [name, setName] = useState(params.bot_name || "Coco Bot");

  useEffect(() => {
    (async () => {
      if (!params.channel_id) return;
      try {
        const result = await fetch(`/v2/bot/${params.channel_id}`, {
          method: "GET",
        });
        if (!result.ok) throw new Error(result.statusText);
        const reply = (await result.json()) as { avatar: string; name: string };
        reply.avatar && setAvatar(reply.avatar);
        reply.name && setName(reply.name);

        return reply;
      } catch (e) {
        return e.message;
      }
    })();
  }, []);

  return {
    avatar,
    name,
  } as const;
};
