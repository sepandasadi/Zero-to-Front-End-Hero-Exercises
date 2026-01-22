# Project 3: Interactive Browser Game (Simon Says)

**Difficulty:** ⭐⭐⭐⭐ Advanced  
**Estimated Time:** 8-10 hours  
**Skills Practiced:** Event Handling, State Management, Timers, Game Logic, Animation, Audio Integration

## Project Overview

Build a complete Simon Says memory game - the classic electronic game where you must repeat increasingly long sequences of colors and sounds. This capstone project for Volume 2 synthesizes everything you've learned: DOM manipulation, event handling, async programming, state management, and more.

## What You'll Build

A fully functional browser game featuring:
- 4 colored game buttons with visual/audio feedback
- Computer-generated random sequences
- Progressive difficulty (sequences get longer)
- Score tracking with high score persistence
- Multiple difficulty levels (speed variations)
- Smooth animations and transitions
- Sound effects for each button
- Game state management
- Responsive design

## Learning Objectives

By completing this project, you will master:
- Complex state management without frameworks
- Async programming (timers, delays, sequences)
- Event handling and delegation
- The `this` context in different scenarios
- Game logic and algorithms
- Animation and CSS transitions
- Audio API integration
- localStorage for data persistence

## Game Rules

1. **Start**: Player clicks "Start Game"
2. **Watch**: Computer plays a sequence (lights up buttons with sounds)
3. **Repeat**: Player clicks buttons to repeat the sequence
4. **Success**: Computer adds one more step and plays again
5. **Fail**: Wrong button ends the game
6. **Score**: Track level reached and high score

## Features Required

### Core Features
- [ ] 4 colored buttons (red, green, blue, yellow)
- [ ] Random sequence generation
- [ ] Sequence playback with highlights and sounds
- [ ] Player input capture
- [ ] Sequence validation
- [ ] Level progression (add one step each round)
- [ ] Score tracking
- [ ] High score with localStorage
- [ ] Game over detection

### Visual Feedback
- [ ] Button press animations
- [ ] Active/inactive states
- [ ] Success/failure indicators
- [ ] Level and score display
- [ ] Loading/ready states

### Audio
- [ ] Unique sound for each button
- [ ] Game over sound
- [ ] Success sound (optional)

### Difficulty Levels
- [ ] Easy - Slow speed (1000ms per step)
- [ ] Normal - Medium speed (600ms per step)
- [ ] Hard - Fast speed (400ms per step)

### Controls
- [ ] Start button
- [ ] Reset button
- [ ] Difficulty selector

## Milestones

- [ ] **Milestone 1** - Game board UI and styling (2 hours)
- [ ] **Milestone 2** - Core game loop (sequence generation, playback, input) (3 hours)
- [ ] **Milestone 3** - Game logic (validation, progression, game over) (2 hours)
- [ ] **Milestone 4** - Audio and animations (2 hours)
- [ ] **Milestone 5** - Difficulty levels, high score, polish (1-2 hours)

## Technical Challenges

### State Management
Managing multiple game states (idle, playing sequence, player turn, game over) without getting into spaghetti code.

### Async Sequence Playback
Playing a sequence with delays between steps requires careful async handling.

### Preventing Input During Playback
Buttons must be disabled while the computer is playing.

### Sound Management
Loading and playing sounds without lag or overlap.

## Getting Started

1. **Read** `requirements.md` for detailed specifications
2. **Review** `rubric.md` for evaluation criteria
3. **Check** `hints.md` when you encounter challenges
4. **Start** with the starter files in `starter/`
5. **Test** frequently as you build
6. **Compare** with solution only after attempting yourself

## Deployment

Once complete, deploy your game:
- **GitHub Pages** (easiest)
- **Netlify**
- **Vercel**

Share it and challenge friends to beat your high score!

## Need Help?

- Review Volume 2 chapters on:
  - Events (Ch. 9)
  - Async JavaScript (Ch. 12)
  - State Management patterns (Ch. 19)
  - Browser APIs (Ch. 11)
- Check `hints.md` for common challenges
- Study the solution code if truly stuck (but try first!)

---

**This is your Volume 2 capstone project!** It brings together all your JavaScript skills. Take your time, experiment, debug, and create a game you're proud to share! 🎮
