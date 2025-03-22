import * as React from "react";
import Box from "../box";
import { avatarName } from "../avatar/avatar.css";
import type { AvatarNameProps } from "../avatar/avatar.types";

function AvatarName(props: AvatarNameProps) {
  const { showInitials = true } = props;
  function initials(name: string) {
    if (typeof props.getInitials === "function") {
      return props.getInitials(props.name);
    }
    const names = name.split(" ");
    const firstName = names[0] ?? "";
    const lastName = names.length > 1 ? names[names.length - 1] : "";
    return firstName && lastName
      ? `${firstName.charAt(0)}${lastName.charAt(0)}`
      : firstName.charAt(0);
  }
  return (
    <Box
      fontFamily="$body"
      fontWeight="$normal"
      attributes={{ role: "img", "aria-label": props.name }}
      boxRef={props.boxRef}
      className={avatarName}
    >
      {!!props.name && showInitials ? <>{initials(props.name)}</> : null}
    </Box>
  );
}

export default AvatarName;
