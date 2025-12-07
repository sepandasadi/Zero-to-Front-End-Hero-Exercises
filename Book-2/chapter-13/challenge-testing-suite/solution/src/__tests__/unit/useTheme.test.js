import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTheme } from '../../hooks/useTheme';

describe('useTheme Hook - Unit Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('initializes with light theme by default', () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('light');
    expect(result.current.isDark).toBe(false);
  });

  it('loads theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('dark');
    expect(result.current.isDark).toBe(true);
  });

  it('toggles theme from light to dark', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('dark');
    expect(result.current.isDark).toBe(true);
  });

  it('toggles theme from dark to light', () => {
    localStorage.setItem('theme', 'dark');

    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('light');
    expect(result.current.isDark).toBe(false);
  });

  it('persists theme to localStorage', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });

    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('sets data-theme attribute on document', () => {
    const { result } = renderHook(() => useTheme());

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    act(() => {
      result.current.toggleTheme();
    });

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('handles multiple toggles', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme(); // dark
      result.current.toggleTheme(); // light
      result.current.toggleTheme(); // dark
    });

    expect(result.current.theme).toBe('dark');
  });
});

