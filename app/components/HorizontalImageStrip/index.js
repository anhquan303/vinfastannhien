// ProductStripFullWidthV5.jsx
import React, { useRef } from 'react';
import { Box } from '@mui/material';
import { useHistory } from 'react-router-dom';

export default function ProductStripFullWidthV5({
  products,
  basePath = '/products', // Route: /products/:slug
}) {
  const history = useHistory();
  const stripRef = useRef(null);

  // guard kéo vs click
  const movedRef = useRef(false);
  const startXRef = useRef(0);

  // --- DESKTOP: chuột ---
  const onMouseDown = e => {
    startXRef.current = e.clientX;
    movedRef.current = false;
  };
  const onMouseMove = e => {
    // chỉ khi đang giữ chuột (buttons=1)
    if (e.buttons !== 1) return;
    if (Math.abs(e.clientX - startXRef.current) > 6) movedRef.current = true;
  };

  // --- MOBILE: cảm ứng ---
  const onTouchStart = e => {
    if (!e.touches?.[0]) return;
    startXRef.current = e.touches[0].clientX;
    movedRef.current = false;
  };
  const onTouchMove = e => {
    if (!e.touches?.[0]) return;
    if (Math.abs(e.touches[0].clientX - startXRef.current) > 6) {
      movedRef.current = true;
    }
  };

  // lăn chuột dọc => cuộn ngang (desktop)
  const onWheel = e => {
    const el = stripRef.current;
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  };

  const go = slugOrId => {
    if (movedRef.current) {
      movedRef.current = false;
      return;
    } // vừa kéo -> không click
    const slug = String(slugOrId);
    history.push(`${basePath}/${encodeURIComponent(slug)}`);
  };

  return (
    <Box
      ref={stripRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onWheel={onWheel}
      sx={{
        // full-bleed
        width: '100vw',
        ml: 'calc(50% - 50vw)',
        mr: 'calc(50% - 50vw)',

        overflowX: 'auto',
        overflowY: 'hidden',

        display: 'grid',
        gridAutoFlow: 'column',
        gridAutoColumns: { xs: '200px', sm: '240px', md: '260px', lg: '280px' },
        gap: 2,

        scrollSnapType: 'x mandatory',
        scrollPadding: '0 24px',
        WebkitOverflowScrolling: 'touch',

        // ẩn scrollbar
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },

        px: 2,
        py: 2,
        cursor: { md: 'grab' },
        touchAction: 'pan-y', // vẫn cuộn dọc trang
      }}
    >
      {products.map(p => {
        const slug = p.slug || p.id; // ưu tiên slug
        return (
          <Box
            key={slug}
            sx={{
              scrollSnapAlign: 'start',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              role="link"
              tabIndex={0}
              onClick={() => go(slug)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  movedRef.current = false;
                  go(slug);
                }
              }}
              draggable={false}
              aria-label={p.name || `Sản phẩm ${slug}`}
              title={p.name || `Sản phẩm ${slug}`}
              sx={{
                width: '100%', // ăn theo gridAutoColumns
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                background: '#fff',
                outline: 'none',
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'inherit',
                '&:focus-visible': {
                  boxShadow: '0 0 0 3px rgba(255,44,139,0.35)',
                },
                userSelect: 'none',
              }}
            >
              <Box
                component="img"
                src={p.image}
                alt={p.name || `Product ${slug}`}
                draggable={false}
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  pointerEvents: 'none', // để click/tap đi vào Box cha
                }}
              />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
