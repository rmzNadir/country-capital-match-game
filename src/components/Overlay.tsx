import { type FC, type ReactNode } from "react";

export interface OverlayProps {
  isVisible: boolean;
  content: ReactNode;
  children: ReactNode;
}
export const Overlay: FC<OverlayProps> = ({ isVisible, content, children }) => {
  if (!isVisible) return <>{children}</>;

  return (
    <div className="relative m-4 p-4">
      <div className="absolute inset-0 flex items-center justify-center rounded bg-black bg-opacity-70">
        {content}
      </div>
      {children}
    </div>
  );
};
