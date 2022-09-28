import create from "zustand";
import { devtools, persist, StateStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { del, get, set } from "idb-keyval";

// Custom storage object
const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    console.log(name, "has been retrieved");
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    console.log(name, "with value", value, "has been saved");
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    console.log(name, "has been deleted");
    await del(name);
  },
};

export type BoxType = {
  id: number;
  clicked: boolean;
};

export type ILootBattlerStore = {
  boxes: BoxType[];
  setBoxes: (boxes: BoxType[]) => void;
  addBox: (boxId: BoxType) => void;
  removeBox: (index: number) => void;
  setBoxClicked: (index: number) => void;
};

export const useLootBattlerStore = create<ILootBattlerStore>()(
  immer(
    devtools(
      persist(
        (set) => ({
          boxes: [
            { id: 1, clicked: false },
            { id: 2, clicked: false },
          ],
          setBoxes: (boxes) => set({ boxes }),
          addBox: (box) => set((state) => void state.boxes.push(box)),
          removeBox: (index) =>
            set((state) => void state.boxes.splice(index, 1)),
          setBoxClicked: (index) => {
            set(
              (state) =>
                void (state.boxes.find((box) => box.id === index)!.clicked =
                  !state.boxes.find((box) => box.id === index)!.clicked)
            );
          },
        }),
        {
          name: "loot-battler-storage",
          getStorage: () => storage,
        }
      )
    )
  )
);
