import { useEffect, useState } from "react";

import { CoCoChatWindowParams } from "../types";

export const newAvatarLinks = {
  Naomi: "/bots/profiles/naomi.png",
  Rose: "/bots/profiles/rose.png",
  Sara: "/bots/profiles/sara.png",
  Dylan: "/bots/profiles/dylan.png",
  Miles: "/bots/profiles/miles.png",
  Marcus: "/bots/profiles/marcus.png",
} as { [key: string]: string };

export const useBotDetails = (params: CoCoChatWindowParams) => {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState(params.bot_name || "Coco Bot");

  useEffect(() => {
    (async () => {
      if (!params.channel_id) return;
      try {
        const result = await fetch(
          `https://cocohub.ai/v2/channel/${params.channel_id}/bot`,
          {
            method: "GET",
          }
        );
        if (!result.ok) throw new Error(result.statusText);
        const reply = (await result.json()) as {
          avatar_id: string;
          name: string;
        };
        const a = newAvatarLinks[reply.avatar_id];
        setAvatar(
          params.image || a
            ? `https://cocohub.ai/${a}`
            : `https://storage.googleapis.com/coco_public/avatars/profiles/lali1.png`
        );
        reply.name && setName(reply.name);

        return reply;
      } catch (e: any) {
        setAvatar(
          params.image ||
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
