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

  const handleMouseDown = (e: React.MouseEvent) => {
    // Stop propagation to prevent row click
    e.stopPropagation();
    
    startTime.current = Date.now();
    setIsHolding(true);
    setProgress(0);
    
    progressInterval.current = window.setInterval(() => {
      const elapsed = Date.now() - (startTime.current || 0);
      const newProgress = Math.min(100, (elapsed / holdDuration) * 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        handleComplete();
      }
    }, 50);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    // Stop propagation to prevent row click
    e.stopPropagation();
    
    if (progressInterval.current) {
      window.clearInterval(progressInterval.current);
    }
    setIsHolding(false);
    setProgress(0);
  };

  const handleComplete = () => {
    if (progressInterval.current) {
      window.clearInterval(progressInterval.current);
    }
    setIsHolding(false);
    setProgress(0);
    onDelete();
  };

  const getColor = () => {
    if (progress < 50) return '#FFD700'; // Gold
    if (progress < 80) return '#FFA500'; // Orange
    return '#FF0000'; // Red
  };

  // Add click handler to stop propagation
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <IconButton
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      size={size}
      sx={{
        color: isHolding ? getColor() : 'black',
        transition: 'color 0.2s',
        zIndex: 1,
        position: 'relative'
      }} 
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