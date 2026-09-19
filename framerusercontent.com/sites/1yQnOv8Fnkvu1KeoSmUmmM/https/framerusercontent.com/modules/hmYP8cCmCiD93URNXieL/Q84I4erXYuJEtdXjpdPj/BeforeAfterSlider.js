import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import {
  startTransition,
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { addPropertyControls, ControlType } from "framer";
const clampPercentage = (value) => Math.min(100, Math.max(0, value));
const parseLineHeight = (lh) => {
  if (!lh) return "inherit";
  return typeof lh === "number" ? `${lh}px` : lh;
};
/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */ export default function BeforeAfterSlider(props) {
  const {
    imageBefore,
    imageAfter,
    labelBefore,
    labelAfter,
    labelBeforeColor,
    labelAfterColor,
    font,
    direction,
    dividerColor,
    dividerWidth,
    dividerStyle,
    dividerShadow,
    dividerShadowColor,
    dividerShadowBlur,
    showHandle,
    handleSize,
    handleBackgroundColor,
    handleBorderColor,
    handleBorderWidth,
    handleRadius,
    handleShadow,
    showArrows,
    arrowMode,
    arrowLeftCustom,
    arrowRightCustom,
    arrowColor,
    arrowSize,
    arrowGap,
    arrowRotation,
  } = props;
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const isHorizontal = direction === "horizontal"; // Refs for direct DOM manipulation (avoids re-render flicker)
  const beforeImgRef = useRef(null);
  const lineRef = useRef(null);
  const labelBeforeRef = useRef(null);
  const labelAfterRef = useRef(null);
  const setBeforeElementRef = useCallback((el) => {
    beforeImgRef.current = el;
  }, []);
  const applyPosition = useCallback(
    (pos) => {
      const clamped = clampPercentage(pos);
      if (beforeImgRef.current) {
        beforeImgRef.current.style.clipPath = isHorizontal
          ? `inset(0% ${100 - clamped}% 0% 0%)`
          : `inset(0% 0% ${100 - clamped}% 0%)`;
      }
      if (lineRef.current) {
        if (isHorizontal) {
          lineRef.current.style.left = `${clamped}%`;
        } else {
          lineRef.current.style.top = `${clamped}%`;
        }
      }
      if (labelBeforeRef.current) {
        labelBeforeRef.current.style.opacity = clamped < 15 ? "0" : "1";
      }
      if (labelAfterRef.current) {
        labelAfterRef.current.style.opacity = clamped > 85 ? "0" : "1";
      }
    },
    [isHorizontal]
  );
  const getPosFromEvent = useCallback(
    (e) => {
      if (!containerRef.current) return 50;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0]?.clientX ?? 0 : e.clientX;
      const clientY = "touches" in e ? e.touches[0]?.clientY ?? 0 : e.clientY;
      return isHorizontal
        ? ((clientX - rect.left) / rect.width) * 100
        : ((clientY - rect.top) / rect.height) * 100;
    },
    [isHorizontal]
  );
  const handleStart = useCallback(
    (e) => {
      e.preventDefault();
      isDragging.current = true;
      const pos = getPosFromEvent(e);
      applyPosition(pos);
      startTransition(() => {
        setSliderPos(clampPercentage(pos));
      });
    },
    [getPosFromEvent, applyPosition]
  );
  const handleMove = useCallback(
    (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const pos = getPosFromEvent(e);
      applyPosition(pos);
    },
    [getPosFromEvent, applyPosition]
  );
  const handleEnd = useCallback(
    (e) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      const pos = getPosFromEvent(e);
      startTransition(() => {
        setSliderPos(clampPercentage(pos));
      });
    },
    [getPosFromEvent]
  );
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (typeof window === "undefined") return; // Passive: false so we can preventDefault and block scroll-while-dragging
    el.addEventListener("touchstart", handleStart, { passive: false });
    el.addEventListener("touchmove", handleMove, { passive: false });
    el.addEventListener("touchend", handleEnd, { passive: false });
    el.addEventListener("mousedown", handleStart);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);
    return () => {
      el.removeEventListener("touchstart", handleStart);
      el.removeEventListener("touchmove", handleMove);
      el.removeEventListener("touchend", handleEnd);
      el.removeEventListener("mousedown", handleStart);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
    };
  }, [handleStart, handleMove, handleEnd]);
  const baseDynamicLabelStyle = useMemo(
    () => ({
      ...labelStyle,
      ...font,
      fontSize: font?.fontSize ? `${font.fontSize}px` : "14px",
      lineHeight: parseLineHeight(font?.lineHeight),
    }),
    [font]
  );
  const clipPath = isHorizontal
    ? `inset(0% ${100 - sliderPos}% 0% 0%)`
    : `inset(0% 0% ${100 - sliderPos}% 0%)`;
  const lineVisualStyle = useMemo(() => {
    if (dividerStyle === "solid") {
      return { backgroundColor: dividerColor };
    }
    const dash = dividerStyle === "dashed" ? 10 : 3;
    const gap = dividerStyle === "dashed" ? 6 : 5;
    const directionValue = isHorizontal ? "to bottom" : "to right";
    return {
      backgroundColor: "transparent",
      backgroundImage: `repeating-linear-gradient(${directionValue}, ${dividerColor} 0px, ${dividerColor} ${dash}px, transparent ${dash}px, transparent ${
        dash + gap
      }px)`,
    };
  }, [dividerStyle, dividerColor, isHorizontal]);
  const defaultArrowRotation = isHorizontal ? 0 : 90;
  const finalArrowRotation = defaultArrowRotation + arrowRotation;
  const hasCustomLeft = Boolean(arrowLeftCustom);
  const hasCustomRight = Boolean(arrowRightCustom);
  const customLeftSrc = hasCustomLeft
    ? arrowLeftCustom
    : hasCustomRight
    ? arrowRightCustom
    : "";
  const customRightSrc = hasCustomRight
    ? arrowRightCustom
    : hasCustomLeft
    ? arrowLeftCustom
    : "";
  return /*#__PURE__*/ _jsxs("div", {
    ref: containerRef,
    style: {
      ...containerStyle,
      cursor: isHorizontal ? "ew-resize" : "ns-resize",
      touchAction: "none",
    },
    children: [
      imageAfter
        ? /*#__PURE__*/ _jsx("img", {
            src: imageAfter,
            style: imageStyle,
            alt: "After",
            draggable: false,
          })
        : /*#__PURE__*/ _jsx("div", {
            style: { ...imageStyle, backgroundColor: "#EBEBEB" },
          }),
      imageBefore
        ? /*#__PURE__*/ _jsx("img", {
            ref: setBeforeElementRef,
            src: imageBefore,
            style: { ...imageStyle, clipPath },
            alt: "Before",
            draggable: false,
          })
        : /*#__PURE__*/ _jsx("div", {
            ref: setBeforeElementRef,
            style: { ...imageStyle, backgroundColor: "#CCCCCC", clipPath },
          }),
      labelBefore &&
        /*#__PURE__*/ _jsx("div", {
          ref: labelBeforeRef,
          style: {
            ...baseDynamicLabelStyle,
            backgroundColor: labelBeforeColor,
            ...(isHorizontal
              ? { left: "16px", bottom: "16px" }
              : { top: "16px", left: "50%", transform: "translateX(-50%)" }),
            opacity: sliderPos < 15 ? 0 : 1,
            transition: "opacity 0.25s ease-in-out",
          },
          children: labelBefore,
        }),
      labelAfter &&
        /*#__PURE__*/ _jsx("div", {
          ref: labelAfterRef,
          style: {
            ...baseDynamicLabelStyle,
            backgroundColor: labelAfterColor,
            ...(isHorizontal
              ? { right: "16px", bottom: "16px" }
              : { bottom: "16px", left: "50%", transform: "translateX(-50%)" }),
            opacity: sliderPos > 85 ? 0 : 1,
            transition: "opacity 0.25s ease-in-out",
          },
          children: labelAfter,
        }),
      /*#__PURE__*/ _jsx("div", {
        ref: lineRef,
        style: {
          ...lineStyle,
          ...lineVisualStyle,
          left: isHorizontal ? `${sliderPos}%` : 0,
          top: isHorizontal ? 0 : `${sliderPos}%`,
          width: isHorizontal ? `${dividerWidth}px` : "100%",
          height: isHorizontal ? "100%" : `${dividerWidth}px`,
          transform: isHorizontal ? "translateX(-50%)" : "translateY(-50%)",
          boxShadow: dividerShadow
            ? `0px 0px ${dividerShadowBlur}px ${dividerShadowColor}`
            : "none",
        },
        children:
          showHandle &&
          /*#__PURE__*/ _jsx("div", {
            style: {
              ...handleStyle,
              width: `${handleSize}px`,
              height: `${handleSize}px`,
              minWidth: `${handleSize}px`,
              minHeight: `${handleSize}px`,
              flexShrink: 0,
              boxSizing: "border-box",
              backgroundColor: handleBackgroundColor,
              border: `${handleBorderWidth}px solid ${handleBorderColor}`,
              borderRadius: `${handleRadius}px`,
              boxShadow: handleShadow ? "0 2px 6px rgba(0,0,0,0.3)" : "none",
            },
            children:
              showArrows &&
              /*#__PURE__*/ _jsx("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: `${arrowGap}px`,
                  transform: `rotate(${finalArrowRotation}deg)`,
                },
                children:
                  arrowMode === "Custom" && (customLeftSrc || customRightSrc)
                    ? /*#__PURE__*/ _jsxs(_Fragment, {
                        children: [
                          customLeftSrc
                            ? /*#__PURE__*/ _jsx("img", {
                                src: customLeftSrc,
                                alt: "",
                                style: {
                                  width: `${arrowSize}px`,
                                  height: `${arrowSize}px`,
                                  objectFit: "contain",
                                },
                              })
                            : null,
                          customRightSrc
                            ? /*#__PURE__*/ _jsx("img", {
                                src: customRightSrc,
                                alt: "",
                                style: {
                                  width: `${arrowSize}px`,
                                  height: `${arrowSize}px`,
                                  objectFit: "contain",
                                  transform:
                                    !hasCustomRight && hasCustomLeft
                                      ? "scaleX(-1)"
                                      : undefined,
                                },
                              })
                            : null,
                        ],
                      })
                    : /*#__PURE__*/ _jsxs(_Fragment, {
                        children: [
                          /*#__PURE__*/ _jsx("svg", {
                            viewBox: "0 0 24 24",
                            width: arrowSize,
                            height: arrowSize,
                            stroke: arrowColor,
                            strokeWidth: "2.5",
                            fill: "none",
                            children: /*#__PURE__*/ _jsx("polyline", {
                              points: "14 6 8 12 14 18",
                            }),
                          }),
                          /*#__PURE__*/ _jsx("svg", {
                            viewBox: "0 0 24 24",
                            width: arrowSize,
                            height: arrowSize,
                            stroke: arrowColor,
                            strokeWidth: "2.5",
                            fill: "none",
                            children: /*#__PURE__*/ _jsx("polyline", {
                              points: "10 6 16 12 10 18",
                            }),
                          }),
                        ],
                      }),
              }),
          }),
      }),
    ],
  });
}
addPropertyControls(BeforeAfterSlider, {
  direction: {
    type: ControlType.Enum,
    title: "Direction",
    options: ["horizontal", "vertical"],
    optionTitles: ["Horizontal", "Vertical"],
    defaultValue: "horizontal",
    displaySegmentedControl: true,
  },
  imageBefore: { type: ControlType.Image, title: "Before Image" },
  imageAfter: { type: ControlType.Image, title: "After Image" },
  labelBefore: {
    type: ControlType.String,
    title: "Left/Top Label",
    defaultValue: "Before",
  },
  labelBeforeColor: {
    type: ControlType.Color,
    title: "Left/Top Color",
    defaultValue: "#408053",
  },
  labelAfter: {
    type: ControlType.String,
    title: "Right/Bottom Label",
    defaultValue: "After",
  },
  labelAfterColor: {
    type: ControlType.Color,
    title: "Right/Bottom Color",
    defaultValue: "#408053",
  },
  font: {
    type: ControlType.Font,
    title: "Typography",
    controls: "extended",
    displayFontSize: true,
    defaultValue: {
      fontSize: 14,
      variant: "Medium",
      lineHeight: "1.2em",
      letterSpacing: "-0.01em",
    },
    defaultFontType: "sans-serif",
  },
  dividerColor: {
    type: ControlType.Color,
    title: "Divider Color",
    defaultValue: "#FFFFFF",
  },
  dividerWidth: {
    type: ControlType.Number,
    title: "Divider Width",
    min: 0,
    max: 20,
    step: 1,
    defaultValue: 3,
  },
  dividerStyle: {
    type: ControlType.Enum,
    title: "Divider Style",
    options: ["solid", "dashed", "dotted"],
    optionTitles: ["Solid", "Dashed", "Dotted"],
    defaultValue: "solid",
  },
  dividerShadow: {
    type: ControlType.Boolean,
    title: "Divider Shadow",
    defaultValue: true,
  },
  dividerShadowColor: {
    type: ControlType.Color,
    title: "Shadow Color",
    defaultValue: "rgba(0,0,0,0.3)",
    hidden: (props) => !props.dividerShadow,
  },
  dividerShadowBlur: {
    type: ControlType.Number,
    title: "Shadow Blur",
    min: 0,
    max: 40,
    step: 1,
    defaultValue: 5,
    hidden: (props) => !props.dividerShadow,
  },
  showHandle: {
    type: ControlType.Boolean,
    title: "Show Handle",
    defaultValue: true,
  },
  handleSize: {
    type: ControlType.Number,
    title: "Handle Size",
    min: 20,
    max: 120,
    step: 1,
    defaultValue: 40,
  },
  handleBackgroundColor: {
    type: ControlType.Color,
    title: "Handle BG",
    defaultValue: "#FFFFFF",
  },
  handleBorderColor: {
    type: ControlType.Color,
    title: "Handle Border",
    defaultValue: "rgba(0,0,0,0.15)",
  },
  handleBorderWidth: {
    type: ControlType.Number,
    title: "Border Width",
    min: 0,
    max: 10,
    step: 1,
    defaultValue: 0,
  },
  handleRadius: {
    type: ControlType.Number,
    title: "Corner Radius",
    min: 0,
    max: 999,
    step: 1,
    defaultValue: 999,
  },
  handleShadow: {
    type: ControlType.Boolean,
    title: "Handle Shadow",
    defaultValue: true,
  },
  showArrows: {
    type: ControlType.Boolean,
    title: "Show Arrows",
    defaultValue: true,
  },
  arrowMode: {
    type: ControlType.Enum,
    title: "Arrow Mode",
    options: ["Default", "Custom"],
    optionTitles: ["Default", "Custom"],
    defaultValue: "Default",
  },
  arrowLeftCustom: {
    type: ControlType.Image,
    title: "Left/Up Arrow",
    hidden: (props) => props.arrowMode !== "Custom",
  },
  arrowRightCustom: {
    type: ControlType.Image,
    title: "Right/Down Arrow",
    hidden: (props) => props.arrowMode !== "Custom",
  },
  arrowColor: {
    type: ControlType.Color,
    title: "Arrow Color",
    defaultValue: "#333333",
    hidden: (props) => props.arrowMode === "Custom",
  },
  arrowSize: {
    type: ControlType.Number,
    title: "Arrow Size",
    min: 8,
    max: 64,
    step: 1,
    defaultValue: 14,
  },
  arrowGap: {
    type: ControlType.Number,
    title: "Arrow Gap",
    min: 0,
    max: 30,
    step: 1,
    defaultValue: 4,
  },
  arrowRotation: {
    type: ControlType.Number,
    title: "Arrow Rotation",
    min: -180,
    max: 180,
    step: 1,
    defaultValue: 0,
  },
});
const containerStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  backgroundColor: "#F5F5F5",
  userSelect: "none",
  WebkitUserSelect: "none",
};
const imageStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  pointerEvents: "none",
};
const labelStyle = {
  position: "absolute",
  padding: "6px 14px",
  color: "#FFFFFF",
  borderRadius: "20px",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  backdropFilter: "blur(4px)",
  pointerEvents: "none",
  zIndex: 2,
};
const lineStyle = {
  position: "absolute",
  pointerEvents: "none",
  zIndex: 3,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const handleStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
export const __FramerMetadata__ = {
  exports: {
    default: {
      type: "reactComponent",
      name: "BeforeAfterSlider",
      slots: [],
      annotations: {
        framerSupportedLayoutHeight: "any-prefer-fixed",
        framerContractVersion: "1",
        framerSupportedLayoutWidth: "any-prefer-fixed",
      },
    },
    __FramerMetadata__: { type: "variable" },
  },
};
//# sourceMappingURL=./BeforeAfterSlider.map
