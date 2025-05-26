import orderHistoryReducer, { fetchOrderHistory } from '../orderHistorySlice';

describe('orderHistorySlice', () => {
  const initialState = {
    dailyOrders: [],
    loading: false,
    error: null,
    lastFetched: null,
  };

  const mockOrders = [
    { id: '1', date: '2023-01-01', total: 100 },
    { id: '2', date: '2023-01-02', total: 200 },
  ];

  it('should return the initial state', () => {
    expect(orderHistoryReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchOrderHistory.pending', () => {
    const action = { type: fetchOrderHistory.pending.type };
    const state = orderHistoryReducer(initialState, action);
    
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchOrderHistory.fulfilled', () => {
    const action = { 
      type: fetchOrderHistory.fulfilled.type, 
      payload: mockOrders 
    };
    const state = orderHistoryReducer(initialState, action);
    
    expect(state.loading).toBe(false);
    expect(state.dailyOrders).toEqual(mockOrders);
    expect(state.lastFetched).toBeGreaterThan(0);
  });

  it('should handle fetchOrderHistory.rejected', () => {
    const action = { 
      type: fetchOrderHistory.rejected.type, 
      error: { message: 'Fetch failed' } 
    };
    const state = orderHistoryReducer(initialState, action);
    
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Fetch failed');
  });

  it('should maintain state structure', () => {
    const state = orderHistoryReducer(undefined, { type: 'unknown' });
    
    expect(state).toHaveProperty('dailyOrders');
    expect(state).toHaveProperty('loading');
    expect(state).toHaveProperty('error');
    expect(state).toHaveProperty('lastFetched');
  });

  it('should have correct initial values', () => {
    const state = orderHistoryReducer(undefined, { type: 'unknown' });
    
    expect(state.dailyOrders).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.lastFetched).toBeNull();
  });
}); 