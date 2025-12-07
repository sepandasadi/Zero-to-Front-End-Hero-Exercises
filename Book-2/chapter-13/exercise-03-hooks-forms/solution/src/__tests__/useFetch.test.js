import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from '../hooks/useFetch';

describe('useFetch Hook', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('starts with loading state', () => {
    global.fetch.mockImplementation(() => new Promise(() => {})); // Never resolves

    const { result } = renderHook(() => useFetch('/api/data'));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('fetches data successfully', async () => {
    const mockData = { id: 1, name: 'Test' };
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useFetch('/api/data'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('handles fetch errors', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useFetch('/api/data'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('Network error');
  });

  it('handles HTTP errors', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => useFetch('/api/data'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toContain('404');
  });

  it('sets loading to false after fetch completes successfully', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ data: 'test' }),
    });

    const { result } = renderHook(() => useFetch('/api/data'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it('sets loading to false after fetch fails', async () => {
    global.fetch.mockRejectedValue(new Error('Failed'));

    const { result } = renderHook(() => useFetch('/api/data'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it('refetches data when refetch is called', async () => {
    const mockData1 = { id: 1 };
    const mockData2 = { id: 2 };

    global.fetch
      .mockResolvedValueOnce({ ok: true, json: async () => mockData1 })
      .mockResolvedValueOnce({ ok: true, json: async () => mockData2 });

    const { result } = renderHook(() => useFetch('/api/data'));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData1);
    });

    result.current.refetch();

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData2);
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('fetches again when URL changes', async () => {
    const mockData1 = { id: 1 };
    const mockData2 = { id: 2 };

    global.fetch
      .mockResolvedValueOnce({ ok: true, json: async () => mockData1 })
      .mockResolvedValueOnce({ ok: true, json: async () => mockData2 });

    const { result, rerender } = renderHook(
      ({ url }) => useFetch(url),
      { initialProps: { url: '/api/data1' } }
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData1);
    });

    rerender({ url: '/api/data2' });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData2);
    });
  });

  it('passes fetch options to fetch call', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };

    renderHook(() => useFetch('/api/data', options));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/data', options);
    });
  });

  it('clears error on successful refetch', async () => {
    global.fetch
      .mockRejectedValueOnce(new Error('Error'))
      .mockResolvedValueOnce({ ok: true, json: async () => ({ success: true }) });

    const { result } = renderHook(() => useFetch('/api/data'));

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });

    result.current.refetch();

    await waitFor(() => {
      expect(result.current.error).toBeNull();
      expect(result.current.data).toEqual({ success: true });
    });
  });
});

