import { notification } from "antd";

export const showNotification = (
  type: "error" | "success" | "info" | "warning",
  message: string,
  title?: string,
  duration?: number,
  className?: string
) => {
  if (notification[type]) {
    notification[type]({
      message: title,
      description: message,
      className: className,
      duration,
    });
  }
};
