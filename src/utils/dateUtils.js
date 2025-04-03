import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  
  if (isToday(date)) {
    return `Today at ${format(date, 'h:mm a')}`;
  }
  
  if (isYesterday(date)) {
    return `Yesterday at ${format(date, 'h:mm a')}`;
  }
  
  return format(date, 'MMM d, yyyy h:mm a');
};

export const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};

export const formatListDate = (dateString) => {
  const date = new Date(dateString);
  
  if (isToday(date)) {
    return `Today at ${format(date, 'h:mm a')}`;
  }
  
  if (isYesterday(date)) {
    return `Yesterday at ${format(date, 'h:mm a')}`;
  }
  
  
  if (date.getFullYear() === new Date().getFullYear()) {
    return format(date, 'MMM d, h:mm a');
  }
  
  
  return format(date, 'MMM d, yyyy');
}; 
