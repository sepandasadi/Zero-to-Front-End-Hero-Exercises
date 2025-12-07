import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useForm } from '../hooks/useForm';

describe('useForm Hook', () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Email is required';
    }
    if (!values.password || values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    return errors;
  };

  it('initializes with provided values', () => {
    const { result } = renderHook(() => useForm(initialValues));

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
  });

  it('updates values when handleChange is called', () => {
    const { result } = renderHook(() => useForm(initialValues));

    act(() => {
      result.current.handleChange('email', 'test@example.com');
    });

    expect(result.current.values.email).toBe('test@example.com');
  });

  it('updates multiple fields independently', () => {
    const { result } = renderHook(() => useForm(initialValues));

    act(() => {
      result.current.handleChange('email', 'test@example.com');
      result.current.handleChange('password', 'password123');
    });

    expect(result.current.values).toEqual({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('marks field as touched when handleBlur is called', () => {
    const { result } = renderHook(() => useForm(initialValues));

    act(() => {
      result.current.handleBlur('email');
    });

    expect(result.current.touched.email).toBe(true);
    expect(result.current.touched.password).toBeUndefined();
  });

  it('clears error when user types in field with error', () => {
    const { result } = renderHook(() => useForm(initialValues, validate));

    // Trigger validation error
    act(() => {
      result.current.handleChange('email', '');
      result.current.handleBlur('email');
    });

    expect(result.current.errors.email).toBeTruthy();

    // Type to clear error
    act(() => {
      result.current.handleChange('email', 'test@example.com');
    });

    expect(result.current.errors.email).toBe('');
  });

  it('validates on blur if validate function provided', () => {
    const { result } = renderHook(() => useForm(initialValues, validate));

    act(() => {
      result.current.handleBlur('email');
    });

    expect(result.current.errors.email).toBe('Email is required');
  });

  it('does not validate on blur if no validate function', () => {
    const { result } = renderHook(() => useForm(initialValues));

    act(() => {
      result.current.handleBlur('email');
    });

    expect(result.current.errors).toEqual({});
  });

  it('prevents submit if validation fails', async () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() => useForm(initialValues, validate));

    await act(async () => {
      await result.current.handleSubmit(onSubmit);
    });

    expect(onSubmit).not.toHaveBeenCalled();
    expect(result.current.errors.email).toBe('Email is required');
    expect(result.current.errors.password).toBe('Password must be at least 6 characters');
  });

  it('calls onSubmit when validation passes', async () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() => useForm(initialValues, validate));

    act(() => {
      result.current.handleChange('email', 'test@example.com');
      result.current.handleChange('password', 'password123');
    });

    await act(async () => {
      await result.current.handleSubmit(onSubmit);
    });

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('marks all fields as touched on submit', async () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() => useForm(initialValues, validate));

    await act(async () => {
      await result.current.handleSubmit(onSubmit);
    });

    expect(result.current.touched.email).toBe(true);
    expect(result.current.touched.password).toBe(true);
  });

  it('sets isSubmitting during submission', async () => {
    const onSubmit = vi.fn(() => new Promise(resolve => setTimeout(resolve, 100)));
    const { result } = renderHook(() => useForm(initialValues, validate));

    act(() => {
      result.current.handleChange('email', 'test@example.com');
      result.current.handleChange('password', 'password123');
    });

    const submitPromise = act(async () => {
      await result.current.handleSubmit(onSubmit);
    });

    // Check isSubmitting is true during submission
    expect(result.current.isSubmitting).toBe(true);

    await submitPromise;

    // Check isSubmitting is false after completion
    expect(result.current.isSubmitting).toBe(false);
  });

  it('resets form to initial values', () => {
    const { result } = renderHook(() => useForm(initialValues));

    act(() => {
      result.current.handleChange('email', 'test@example.com');
      result.current.handleChange('password', 'password123');
      result.current.handleBlur('email');
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
  });

  it('clears errors and touched on reset', () => {
    const { result } = renderHook(() => useForm(initialValues, validate));

    act(() => {
      result.current.handleBlur('email');
    });

    expect(result.current.errors.email).toBeTruthy();
    expect(result.current.touched.email).toBe(true);

    act(() => {
      result.current.reset();
    });

    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
  });

  it('handles async onSubmit errors', async () => {
    const onSubmit = vi.fn(() => Promise.reject(new Error('Submit failed')));
    const { result } = renderHook(() => useForm(initialValues, validate));

    act(() => {
      result.current.handleChange('email', 'test@example.com');
      result.current.handleChange('password', 'password123');
    });

    await act(async () => {
      await result.current.handleSubmit(onSubmit);
    });

    // Should not throw, but isSubmitting should be false
    expect(result.current.isSubmitting).toBe(false);
  });

  it('validates individual field on blur', () => {
    const { result } = renderHook(() => useForm({ email: '', password: 'short' }, validate));

    act(() => {
      result.current.handleBlur('password');
    });

    expect(result.current.errors.password).toBeTruthy();
    expect(result.current.errors.email).toBeUndefined();
  });
});

