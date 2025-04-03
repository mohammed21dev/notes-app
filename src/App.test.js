import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('creates new note', async () => {
  render(<App />);
  const addButton = await screen.findByText(/First Note/);
  fireEvent.click(addButton);
  
  const titleInput = screen.getByLabelText(/Title/);
  fireEvent.change(titleInput, { target: { value: 'Test Title' } });
  
  const saveButton = screen.getByText(/Save/);
  fireEvent.click(saveButton);
  
  expect(await screen.findByText(/Test Title/)).toBeInTheDocument();
});