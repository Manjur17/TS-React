import { useReducer } from 'react';

interface State {
  count: number;
  error: string | null;
}

interface Action {
  type: 'increment' | 'decrement';
  payload: {
    count: number;
  };
}

function reducer(state: State, action: Action) {
  const { type, payload } = action;

  switch (type) {
    case 'increment': {
      const newCount = (payload.count) + 1;
      const hasError = newCount > 5;
      return {
        ...state,
        count: hasError ? payload.count : newCount,
        error: hasError ? 'Maximum reached' : null,
      };
    }
    case 'decrement': {
      const newCount = (payload.count) - 1;
      const hasError = newCount < 0;
      return {
        ...state,
        count: hasError ? payload.count : newCount,
        error: hasError ? 'Minimum reached' : null,
      };
    }
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    error: null,
  });

  return (
    <div>
      <div>Count: {state.count}</div>
      {state.error && <div className='mb-2 text-red-500'>{state.error}</div>}
      <button
        className='mb-2'
        onClick={() => dispatch({ type: 'increment', payload: { count: state.count } })}
      >
        Increment
      </button>
      <button
        onClick={() => dispatch({ type: 'decrement', payload: { count: state.count } })}
      >
        Decrement
      </button>
    </div>
  );
}
