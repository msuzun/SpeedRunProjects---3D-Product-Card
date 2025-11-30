import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isHovered: boolean;
  rotationIntensity: number;
  currentThemeColor: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: UiState = {
  isHovered: false,
  rotationIntensity: 0,
  currentThemeColor: '#FFFFFF',
  isLoading: false,
  error: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setHovered: (state, action: PayloadAction<boolean>) => {
      state.isHovered = action.payload;
    },
    setRotationIntensity: (state, action: PayloadAction<number>) => {
      state.rotationIntensity = action.payload;
    },
    setThemeColor: (state, action: PayloadAction<string>) => {
      state.currentThemeColor = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setHovered,
  setRotationIntensity,
  setThemeColor,
  setLoading,
  setError,
  clearError,
} = uiSlice.actions;

export default uiSlice.reducer;

