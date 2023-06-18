import { create } from 'zustand';

interface UploadModel {
    isOpen: boolean;
    onOpen: ()=> void;
    onClose: ()=> void;
}

const useUploadModel = create<UploadModel>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useUploadModel;