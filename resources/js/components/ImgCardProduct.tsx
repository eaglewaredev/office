'use client';
import React from 'react';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import type { CSSObject } from '@mui/material/styles';

import { Info } from '../info-basic/info';
import type { InfoSlotStyles } from '../info-basic/info';
import { InfoEyebrow } from '../info-basic/info-eyebrow';
import { InfoSubtitle } from '../info-basic/info-subtitle';
import { InfoTitle } from '../info-basic/info-title';
import { IconButton, Typography } from '@mui/material';
import { Upload } from '@mui/icons-material';

const useStyles = (): CSSObject & Partial<InfoSlotStyles> => {
  return {
    eyebrow: {
      color: 'rgba(255, 255, 255, 0.92)',
      fontFamily: '"Spartan", san-serif',
      lineHeight: 1.4,
      fontSize: '1.0625rem',
      letterSpacing: '1px',
      textTransform: 'initial',
      marginBottom: 0,
    },
    title: {
      color: '#fff',
      fontSize: '1.25rem',
      fontWeight: 'bold' as const,
      lineHeight: 1.2,
    },
    subtitle: {
      color: 'rgba(255, 255, 255, 0.72)',
      lineHeight: 1.5,
      '&:last-child': {
        marginTop: '1rem',
      },
    },
  };
};

const StyledCard = styled(Card)({
  borderRadius: '1rem',
  boxShadow: 'none',
  position: 'relative',
  minWidth: 200,
  width: '100%',
  minHeight: 360,
  padding: 0,
});

const StyledCardMedia = styled(CardMedia)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  zIndex: 0,
  backgroundPosition: 'top',
});

const Content = styled('div')(({ theme }) => ({
  padding: theme.spacing(3, 2),
  position: 'absolute',
  zIndex: 2,
  bottom: 0,
  width: '100%',
}));

export function ImgProductCard({
    img
}: {
    img: string;
}) {
  return (
    <StyledCard>
      <StyledCardMedia
        image={img}
      />
    </StyledCard>
  );
}

