import { create } from 'zustand';

interface AutModel {
    isOpen: boolean;
    onOpen: ()=> void;
    onClose: ()=> void;
}

const useAutModel = create<AutModel>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useAutModel;