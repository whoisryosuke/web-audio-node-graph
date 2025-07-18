import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Vector2D } from "../utils/types";
import type { ConnectionState, HandleType } from "@xyflow/react";
import type { Handle } from "@xyflow/system";

export type ModalOptions = "keyboard";
export type ConnectionPendingState = {
  node: string;
  handleId: Handle["id"];
  handleType: HandleType;
  position: Vector2D;
};

export interface AppStoreState {
  showNodePopup: boolean;
  toggleNodePopup: () => void;
  setNodePopup: (showNodePopup: boolean) => void;

  connectionPending: ConnectionPendingState | null;
  setConnectionPending: (connectionPending: ConnectionPendingState) => void;
  clearConnectionPending: () => void;

  modal: ModalOptions;
  modalVisible: boolean;
  toggleModal: (visibility: boolean) => void;
  setModal: (modal: ModalOptions) => void;

  mousePosition: Vector2D;
  setMousePosition: (mousePosition: Vector2D) => void;
}

export const useAppStore = create<AppStoreState>()(
  devtools((set) => ({
    showNodePopup: false,
    toggleNodePopup: () =>
      set((state) => ({
        showNodePopup: !state.showNodePopup,
      })),
    setNodePopup: (showNodePopup) =>
      set({
        showNodePopup,
      }),

    connectionPending: false,
    setConnectionPending: (connectionPending) =>
      set({
        connectionPending,
      }),
    clearConnectionPending: () =>
      set({
        connectionPending: null,
      }),

    modal: "keyboard",
    modalVisible: false,
    toggleModal: (visibility: boolean) =>
      set((state) => ({
        modalVisible: visibility ?? !state.modalVisible,
      })),
    setModal: (modal) =>
      set({
        modal,
        modalVisible: true,
      }),

    mousePosition: {
      x: 0,
      y: 0,
    },
    setMousePosition: (mousePosition: Vector2D) =>
      set({
        mousePosition,
      }),
  }))
);
