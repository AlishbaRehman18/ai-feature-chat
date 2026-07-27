# Stateful Button Demo

This project demonstrates a button with five animated states: idle, hover, loading, success, and error. All transitions use transform and opacity for smooth, compositor-friendly motion.

## Motion Rationale
Hover uses 120ms ease-out to feel responsive. Press uses 80ms ease-in to simulate physical compression. Loading uses 250ms cubic-bezier(0.4, 0, 0.2, 1) for clarity. Success uses a 300ms morph for delight. Error uses a 400ms shake to communicate failure. Reduced motion removes animation but keeps feedback.

## Demo
(Your deployed link here)

## How to Test
Click the button repeatedly to trigger random success/error.
