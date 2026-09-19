import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
/**
 * @framerDisableUnlink
 *
 * @framerIntrinsicWidth 724
 * @framerIntrinsicHeight 64
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight fit
 */ function SocialShareButtons(props) {
  useEffect(() => {
    const remixIconCDN = document.createElement("link");
    remixIconCDN.rel = "stylesheet";
    remixIconCDN.href =
      "https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.css";
    document.head.appendChild(remixIconCDN);
  }, []);
  const {
    platforms: propPlatforms,
    showText = true,
    buttonText: propButtonText,
    styleProperties,
    advancedColors,
    horizontalSpacing = 15,
    font,
    textColor,
  } = props;
  const allPlatforms = [
    "Facebook",
    "Twitter",
    "LinkedIn",
    "Pinterest",
    "Instagram",
    "YouTube",
    "Snapchat",
    "WhatsApp",
    "Reddit",
    "Tumblr",
    "VK",
    "Weibo",
    "Telegram",
    "LINE",
    "Pocket",
    "Buffer",
    "Flipboard",
    "Xing",
    "Email",
    "Mastodon",
  ];
  const defaultPlatforms = ["Facebook", "Twitter", "LinkedIn", "Pinterest"];
  const defaultButtonText = Object.fromEntries(allPlatforms.map((p) => [p, p]));
  const platforms =
    propPlatforms && propPlatforms.length > 0
      ? Array.from(new Set(propPlatforms))
      : defaultPlatforms;
  const buttonText = { ...defaultButtonText, ...propButtonText };
  const {
    buttonWidth = 140,
    buttonHeight = 52,
    radius = 100,
  } = styleProperties || {};
  const platformColors = {
    Facebook: advancedColors?.facebookColor || "#0866FF",
    Twitter: advancedColors?.twitterColor || "#101318",
    LinkedIn: advancedColors?.linkedInColor || "#0A66C2",
    Pinterest: advancedColors?.pinterestColor || "#E60019",
    Instagram: advancedColors?.instagramColor || "#EE3A7C",
    YouTube: advancedColors?.youtubeColor || "#FF0302",
    Snapchat: advancedColors?.snapchatColor || "#FFFC00",
    WhatsApp: advancedColors?.whatsappColor || "#25D366",
    Reddit: advancedColors?.redditColor || "#FF4500",
    Tumblr: advancedColors?.tumblrColor || "#36465D",
    VK: advancedColors?.vkColor || "#0077FF",
    Weibo: advancedColors?.weiboColor || "#E6162D",
    Telegram: advancedColors?.telegramColor || "#0088CC",
    LINE: advancedColors?.lineColor || "#00C300",
    Pocket: advancedColors?.pocketColor || "#EF4056",
    Buffer: advancedColors?.bufferColor || "#168EEA",
    Flipboard: advancedColors?.flipboardColor || "#E12828",
    Xing: advancedColors?.xingColor || "#006567",
    Email: advancedColors?.emailColor || "#D44638",
    Mastodon: advancedColors?.mastodonColor || "#5A5AA3",
  }; // ✅ Restored your original icon logic
  const platformIcons = {
    Facebook: /*#__PURE__*/ _jsx("i", {
      className: "ri-facebook-circle-fill",
      style: { fontSize: buttonHeight * 0.4, color: "#FFF" },
    }),
    Twitter: /*#__PURE__*/ _jsx("i", {
      className: "ri-twitter-x-fill",
      style: { fontSize: buttonHeight * 0.4, color: "#FFF" },
    }),
    LinkedIn: /*#__PURE__*/ _jsx("i", {
      className: "ri-linkedin-box-fill",
      style: { fontSize: buttonHeight * 0.4, color: "#FFF" },
    }),
    Pinterest: /*#__PURE__*/ _jsx("i", {
      className: "ri-pinterest-fill",
      style: { fontSize: buttonHeight * 0.4, color: "#FFF" },
    }),
    Instagram: /*#__PURE__*/ _jsx("i", {
      className: "ri-instagram-fill",
      style: { fontSize: buttonHeight * 0.4, color: "#FFF" },
    }),
    YouTube: /*#__PURE__*/ _jsx("i", {
      className: "ri-youtube-fill",
      style: { fontSize: buttonHeight * 0.4, color: "#FFF" },
    }),
    Snapchat: /*#__PURE__*/ _jsx("i", {
      className: "ri-snapchat-fill",
      style: { fontSize: buttonHeight * 0.4, color: "#FFF" },
    }),
    WhatsApp: /*#__PURE__*/ _jsx("i", {
      className: "ri-whatsapp-fill",
      style: { fontSize: buttonHeight * 0.4, color: "#FFF" },
    }),
    Reddit: /*#__PURE__*/ _jsx("i", {
      className: "ri-reddit-fill",
      style: { fontSize: buttonHeight * 0.4, color: "#FFF" },
    }),
    Tumblr: /*#__PURE__*/ _jsx("i", {
      className: "ri-tumblr-fill",
      style: { fontSize: buttonHeight * 0.4, color: "#FFF" },
    }),
    VK: /*#__PURE__*/ _jsx("i", {
      className: "ri-vk-fill",
      style: { fontSize: buttonHeight * 0.4, color: "#FFF" },
    }),
    Weibo: /*#__PURE__*/ _jsx("i", {
      className: "ri-weibo-fill",
      style: { fontSize: buttonHeight * 0.4, color: "#FFF" },
    }),
    Telegram: /*#__PURE__*/ _jsx("i", {
      className: "ri-telegram-fill",
      style: { fontSize: buttonHeight * 0.4, color: "#FFF" },
    }),
    LINE: /*#__PURE__*/ _jsx("i", {
      className: "ri-line-fill",
      style: { fontSize: buttonHeight * 0.4, color: "#FFF" },
    }),
    Pocket: /*#__PURE__*/ _jsx("i", {
      className: "ri-bookmark-fill",
      style: { fontSize: buttonHeight * 0.4, color: "#FFF" },
    }),
    Buffer: /*#__PURE__*/ _jsx("i", {
      className: "ri-stack-fill",
      style: { fontSize: buttonHeight * 0.4, color: "#FFF" },
    }),
    Flipboard: /*#__PURE__*/ _jsx("i", {
      className: "ri-file-copy-fill",
      style: { fontSize: buttonHeight * 0.4, color: "#FFF" },
    }),
    Xing: /*#__PURE__*/ _jsx("i", {
      className: "ri-xing-fill",
      style: { fontSize: buttonHeight * 0.4, color: "#FFF" },
    }),
    Email: /*#__PURE__*/ _jsx("i", {
      className: "ri-mail-fill",
      style: { fontSize: buttonHeight * 0.4, color: "#FFF" },
    }),
    Mastodon: /*#__PURE__*/ _jsx("i", {
      className: "ri-mastodon-fill",
      style: { fontSize: buttonHeight * 0.4, color: "#FFF" },
    }),
  };
  const handleShare = (platform) => {
    const url = window.location.href;
    const encodedUrl = encodeURIComponent(url);
    let shareUrl = "";
    switch (platform) {
      case "Twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
        break;
      case "Facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "LinkedIn":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "Pinterest":
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodedUrl}`;
        break;
      case "WhatsApp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodedUrl}`;
        break;
      case "Reddit":
        shareUrl = `https://www.reddit.com/submit?url=${encodedUrl}`;
        break;
      case "Tumblr":
        shareUrl = `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodedUrl}`;
        break;
      case "VK":
        shareUrl = `https://vk.com/share.php?url=${encodedUrl}`;
        break;
      case "Weibo":
        shareUrl = `https://service.weibo.com/share/share.php?url=${encodedUrl}`;
        break;
      case "Telegram":
        shareUrl = `https://t.me/share/url?url=${encodedUrl}`;
        break;
      case "LINE":
        shareUrl = `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`;
        break;
      case "Pocket":
        shareUrl = `https://getpocket.com/save?url=${encodedUrl}`;
        break;
      case "Buffer":
        shareUrl = `https://buffer.com/add?url=${encodedUrl}`;
        break;
      case "Flipboard":
        shareUrl = `https://share.flipboard.com/bookmarklet/popout?v=2&url=${encodedUrl}`;
        break;
      case "Xing":
        shareUrl = `https://www.xing.com/social/share/spi?url=${encodedUrl}`;
        break;
      case "Email":
        shareUrl = `mailto:?subject=Check%20this%20out&body=${encodedUrl}`;
        break;
      case "Mastodon":
        shareUrl = `https://mastodon.social/share?text=${encodedUrl}`;
        break;
      default:
        break;
    }
    if (shareUrl) {
      window.open(
        shareUrl,
        "_blank",
        "height=700,width=700,left=0,top=0,resizable=yes,scrollbars=yes,status=yes"
      );
    }
  };
  const createButton = (platform) =>
    /*#__PURE__*/ _jsxs(
      motion.div,
      {
        onClick: () => handleShare(platform),
        whileHover: { scale: 1.05, cursor: "pointer" },
        transition: { type: "spring", stiffness: 500, damping: 30 },
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: `${buttonWidth}px`,
          height: `${buttonHeight}px`,
          borderRadius: `${radius}px`,
          backgroundColor: platformColors[platform],
          margin: 0,
          gap: "12px",
          cursor: "pointer",
        },
        children: [
          platformIcons[platform],
          showText &&
            /*#__PURE__*/ _jsx("span", {
              style: { color: textColor, ...font },
              children: buttonText[platform],
            }),
        ],
      },
      platform
    );
  return /*#__PURE__*/ _jsx("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: `${horizontalSpacing}px`,
      width: "100%",
      height: "auto",
    },
    children: platforms.map((platform) => createButton(platform)),
  });
}
SocialShareButtons.displayName = "Social Share Buttons";
addPropertyControls(SocialShareButtons, {
  platforms: {
    title: "Platforms",
    type: ControlType.Array,
    propertyControl: {
      type: ControlType.Enum,
      options: [
        "Facebook",
        "Twitter",
        "LinkedIn",
        "Pinterest",
        "Instagram",
        "YouTube",
        "Snapchat",
        "WhatsApp",
        "Reddit",
        "Tumblr",
        "VK",
        "Weibo",
        "Telegram",
        "LINE",
        "Pocket",
        "Buffer",
        "Flipboard",
        "Xing",
        "Email",
        "Mastodon",
      ],
    },
    defaultValue: ["Facebook", "Twitter", "LinkedIn", "Pinterest"],
  },
  showText: {
    title: "Show Text",
    type: ControlType.Boolean,
    defaultValue: true,
  },
  styleProperties: {
    title: "Style",
    type: ControlType.Object,
    controls: {
      buttonWidth: {
        title: "Width",
        type: ControlType.Number,
        defaultValue: 172,
        min: 24,
        max: 500,
      },
      buttonHeight: {
        title: "Height",
        type: ControlType.Number,
        defaultValue: 64,
        min: 24,
        max: 300,
      },
      radius: {
        title: "Radius",
        type: ControlType.Number,
        defaultValue: 100,
        min: 0,
        max: 500,
      },
    },
  },
  font: {
    title: "Font",
    type: ControlType.Font,
    defaultValue: {
      family: "Inter",
      size: 16,
      weight: 400,
      lineHeight: "1.5em",
    },
    controls: "extended",
  },
  textColor: {
    title: "Text Color",
    type: ControlType.Color,
    defaultValue: "#FFFFFF",
  },
  advancedColors: {
    title: "Colors",
    type: ControlType.Object,
    controls: {
      facebookColor: { type: ControlType.Color, defaultValue: "#0866FF" },
      twitterColor: { type: ControlType.Color, defaultValue: "#101318" },
      linkedInColor: { type: ControlType.Color, defaultValue: "#0A66C2" },
      pinterestColor: { type: ControlType.Color, defaultValue: "#E60019" },
      instagramColor: { type: ControlType.Color, defaultValue: "#EE3A7C" },
      youtubeColor: { type: ControlType.Color, defaultValue: "#FF0302" },
      snapchatColor: { type: ControlType.Color, defaultValue: "#FFFC00" },
      whatsappColor: { type: ControlType.Color, defaultValue: "#25D366" },
      redditColor: { type: ControlType.Color, defaultValue: "#FF4500" },
      tumblrColor: { type: ControlType.Color, defaultValue: "#36465D" },
      vkColor: { type: ControlType.Color, defaultValue: "#0077FF" },
      weiboColor: { type: ControlType.Color, defaultValue: "#E6162D" },
      telegramColor: { type: ControlType.Color, defaultValue: "#0088CC" },
      lineColor: { type: ControlType.Color, defaultValue: "#00C300" },
      pocketColor: { type: ControlType.Color, defaultValue: "#EF4056" },
      bufferColor: { type: ControlType.Color, defaultValue: "#168EEA" },
      flipboardColor: { type: ControlType.Color, defaultValue: "#E12828" },
      xingColor: { type: ControlType.Color, defaultValue: "#006567" },
      emailColor: { type: ControlType.Color, defaultValue: "#D44638" },
      mastodonColor: { type: ControlType.Color, defaultValue: "#5A5AA3" },
    },
  },
  horizontalSpacing: {
    title: "Spacing",
    type: ControlType.Number,
    defaultValue: 12,
    min: 0,
    max: 50,
    step: 1,
    description:
      "[Mr. Framer](https://mrframer.com), Get Free High Quality Framer Resources.",
  },
});
export default SocialShareButtons;
export const __FramerMetadata__ = {
  exports: {
    default: {
      type: "reactComponent",
      name: "SocialShareButtons",
      slots: [],
      annotations: {
        framerSupportedLayoutWidth: "any-prefer-fixed",
        framerIntrinsicHeight: "64",
        framerDisableUnlink: "*",
        framerContractVersion: "1",
        framerIntrinsicWidth: "724",
        framerSupportedLayoutHeight: "fit",
      },
    },
    __FramerMetadata__: { type: "variable" },
  },
};
//# sourceMappingURL=./ShareButton.map
