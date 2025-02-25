import React, { useState, useEffect, useRef } from 'react';
import { IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface HoldDeleteButtonProps {
  onDelete: () => void;
  size?: 'small' | 'medium' | 'large';
  holdDuration?: number;
}

export default function HoldDeleteButton({
  onDelete,
  size = 'small',
  holdDuration = 2000
}: HoldDeleteButtonProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<number>();
  const startTime = useRef<number>();

  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        window.clearInterval(progressInterval.current);
      }
    };
  }, []);

  const startHolding = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setIsHolding(true);
    startTime.current = Date.now();

    progressInterval.current = window.setInterval(() => {
      const elapsed = Date.now() - (startTime.current || 0);
      const newProgress = (elapsed / holdDuration) * 100;
      
      if (newProgress >= 100) {
        setProgress(100);
        setIsHolding(false);
        if (progressInterval.current) {
          window.clearInterval(progressInterval.current);
        }
        onDelete();
      } else {
        setProgress(newProgress);
      }
    }, 10);
  };

  const stopHolding = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setIsHolding(false);
    setProgress(0);
    if (progressInterval.current) {
      window.clearInterval(progressInterval.current);
    }
  };

  const getColor = () => {
    // Color transition from green to red based on progress
    const hue = 120 - (progress * 120) / 100; // 120 is green, 0 is red in HSL
    return `hsl(${hue}, 100%, 35%)`;
  };

  return (
    <IconButton
      size={size}
      onMouseDown={startHolding}
      onMouseUp={stopHolding}
      onMouseLeave={stopHolding}
      onTouchStart={startHolding}
      onTouchEnd={stopHolding}
      sx={{ position: 'relative' }}
    >
      <DeleteIcon 
        fontSize={size} 
        sx={{ 
          color: isHolding ? getColor() : 'black',
          transition: 'color 0.2s',
          zIndex: 1,
          position: 'relative'
        }} 
      />
      {isHolding && (
        <CircularProgress
          size={size === 'small' ? 34 : 44}
          value={progress*3.6}
          variant="determinate"
          sx={{
            position: 'absolute',
            color: getColor(),
            transition: 'color 0.2s',
            transform: 'rotate(-360deg)',
            left: '50%',
            top: '50%',
            marginLeft: size === 'small' ? '-17px' : '-22px',
            marginTop: size === 'small' ? '-17px' : '-22px'
          }}
        />
      )}
    </IconButton>
  );
} 