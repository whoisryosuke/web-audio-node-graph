import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Vector2D } from "../utils/types";

export type ModalOptions = "keyboard";

export interface AppStoreState {
  showNodePopup: boolean;
  toggleNodePopup: () => void;
  setNodePopup: (showNodePopup: boolean) => void;

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
