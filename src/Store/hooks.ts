import { TypedUseSelectorHook, useDispatch as useDispatchRedux, useSelector as useSelectorRedux } from 'react-redux'
import type { RootState, AppDispatch } from '.'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatchRedux<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelectorRedux