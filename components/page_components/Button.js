import * as React from 'react';
import Button from '@mui/material/Button';
import Link from 'next/link';

export default function Buttons({text, href, variant}) {
  return (
      <Button variant={String(variant)} sx={{height:"fit-content"}}><Link href={String(href)}>{text}</Link></Button>
  );
}