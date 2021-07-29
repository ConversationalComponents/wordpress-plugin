import React, { useEffect, useState } from "react";

import { CoCoChatWindowParams } from "../types";

export const useBotDetails = (params: CoCoChatWindowParams) => {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState(params.bot_name || "Coco Bot");

  useEffect(() => {
    (async () => {
      if (!params.channel_id) return;
      try {
        const result = await fetch(
          `https://cocohub.ai/v2/bot/channel/${params.channel_id}/bot`,
          {
            method: "GET",
          }
        );
        if (!result.ok) throw new Error(result.statusText);
        const reply = (await result.json()) as {
          avatar_id: string;
          name: string;
        };
        setAvatar(
          `https://storage.googleapis.com/coco_public/avatars/profiles/${
            reply.avatar_id || "lali"
          }1.png`
        );
        reply.name && setName(reply.name);

        return reply;
      } catch (e) {
        setAvatar(
          "https://storage.googleapis.com/coco_public/avatars/profiles/lali1.png"
        );
        return e.message;
      }
    })();
  }, []);

  return {
    avatar,
    name,
  } as const;
};
