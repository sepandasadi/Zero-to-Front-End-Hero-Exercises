import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useToggle } from '../hooks/useToggle';

describe('useToggle Hook', () => {
  it('initializes with false by default', () => {
    const { result } = renderHook(() => useToggle());
    const [value] = result.current;
    expect(value).toBe(false);
  });

  it('initializes with provided value', () => {
    const { result } = renderHook(() => useToggle(true));
    const [value] = result.current;
    expect(value).toBe(true);
  });

  it('toggles value from false to true', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      const [, toggle] = result.current;
      toggle();
    });

    const [value] = result.current;
    expect(value).toBe(true);
  });

  it('toggles value from true to false', () => {
    const { result } = renderHook(() => useToggle(true));

    act(() => {
      const [, toggle] = result.current;
      toggle();
    });

    const [value] = result.current;
    expect(value).toBe(false);
  });

  it('toggles value multiple times', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      const [, toggle] = result.current;
      toggle();
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      const [, toggle] = result.current;
      toggle();
    });
    expect(result.current[0]).toBe(false);

    act(() => {
      const [, toggle] = result.current;
      toggle();
    });
    expect(result.current[0]).toBe(true);
  });

  it('sets value to true with setTrue', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      const [, , setTrue] = result.current;
      setTrue();
    });

    expect(result.current[0]).toBe(true);
  });

  it('sets value to false with setFalse', () => {
    const { result } = renderHook(() => useToggle(true));

    act(() => {
      const [, , , setFalse] = result.current;
      setFalse();
    });

    expect(result.current[0]).toBe(false);
  });

  it('setTrue sets value to true regardless of current state', () => {
    const { result } = renderHook(() => useToggle(true));

    act(() => {
      const [, , setTrue] = result.current;
      setTrue();
    });

    expect(result.current[0]).toBe(true);
  });

  it('setFalse sets value to false regardless of current state', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      const [, , , setFalse] = result.current;
      setFalse();
    });

    expect(result.current[0]).toBe(false);
  });

  it('maintains function references between renders', () => {
    const { result, rerender } = renderHook(() => useToggle());

    const [, toggle1, setTrue1, setFalse1] = result.current;
    rerender();
    const [, toggle2, setTrue2, setFalse2] = result.current;

    expect(toggle1).toBe(toggle2);
    expect(setTrue1).toBe(setTrue2);
    expect(setFalse1).toBe(setFalse2);
  });
});

