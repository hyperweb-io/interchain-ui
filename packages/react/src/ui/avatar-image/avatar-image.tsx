import * as React from "react";
import { useState, useRef, useEffect } from "react";
import cls from "clsx";
import AvatarName from "../avatar-name";
import { avatarImg } from "../avatar/avatar.css";
import type { AvatarImageProps } from "../avatar/avatar.types";

function AvatarImage(props: AvatarImageProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const cleanupRef = useRef(null);
  const [status, setStatus] = useState(() => "pending");

  const [transitionState, setTransitionState] = useState(() => "idle");

  function load() {
    if (!props.src) return;
    flush();
    const img = new Image();
    img.src = props.src;
    if (props.crossOrigin) img.crossOrigin = props.crossOrigin;
    if (props.srcSet) img.srcset = props.srcSet;
    if (props.sizes) img.sizes = props.sizes;
    if (props.loading) img.loading = props.loading;
    img.onload = (event) => {
      flush();
      setStatus("loaded");
      setTransitionState("entered");
      props.onLoad?.(event);
    };
    img.onerror = (error) => {
      flush();
      setStatus("failed");
      props.onError?.(error);
    };
    imgRef.current = img;
  }

  function flush() {
    if (imgRef.current) {
      imgRef.current.onload = null;
      imgRef.current.onerror = null;
      imgRef.current = null;
      setTransitionState("idle");
    }
  }

  function getResolvedStatus() {
    return props.ignoreFallback ? "loaded" : status;
  }

  function getShowFallback() {
    return !props.src || getResolvedStatus() !== "loaded";
  }

  function getInlineStyles() {
    return {
      opacity: `${transitionState === "idle" ? 0 : 1}`,
      transition:
        transitionState === "entered"
          ? "opacity 150ms cubic-bezier(0.7, 0, 0.84, 0)"
          : "none !important",
    };
  }

  useEffect(() => {
    setStatus(props.src ? "loading" : "pending");
  }, [props.src]);
  useEffect(() => {
    if (props.ignoreFallback) return;
    if (status === "loading") {
      load();
    }
    cleanupRef.current = () => {
      flush();
    };
  }, [
    status,
    props.ignoreFallback,
    props.crossOrigin,
    props.srcSet,
    props.sizes,
    props.onLoad,
    props.onError,
    props.loading,
  ]);

  useEffect(() => {
    return () => {
      if (typeof cleanupRef.current === "function") {
        cleanupRef.current();
      }
    };
  }, []);

  return (
    <>
      {getShowFallback() ? (
        <>
          <AvatarName
            name={props.name}
            getInitials={props.getInitials}
            showInitials={props.fallbackMode === "initials"}
          />
        </>
      ) : (
        <>
          <img
            ref={imgRef}
            src={props.src}
            srcSet={props.srcSet as any}
            alt={props.name}
            onLoad={(event) => props.onLoad}
            width={props.width}
            height={props.height}
            referrerPolicy={props.referrerPolicy as any}
            crossOrigin={(props.crossOrigin as any) ?? undefined}
            loading={props.loading}
            data-status={getResolvedStatus()}
            style={getInlineStyles()}
            className={cls(avatarImg, props.className)}
          />
        </>
      )}
    </>
  );
}

export default AvatarImage;
