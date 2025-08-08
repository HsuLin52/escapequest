# EscapeQuest

**EscapeQuest** is a web-based escape room game where users select a theme and solve puzzles under a time limit. Each room is dynamic, story-driven and includes interactive components like timers, hints and progress tracking.

---

## Project Structure
<pre>
├── pages/
│   ├── index.js         → Home page with theme selection
│   ├── about.js         → About Us page
│   ├── room.js          → Escape room gameplay (dynamic by theme)
│   ├── win.js           → Win screen
│   └── fail.js          → Fail screen
│
├── components/
│   ├── Layout.js        → Header, footer and main wrapper
│   ├── EscapeRoom.js    → Core puzzle gameplay logic and state
│   ├── Puzzle.js        → Puzzle input, hint logic and answer checking
│   ├── Timer.js         → Countdown timer
│   ├── ProgressBar.js   → Shows puzzle progress
│   └── About.js         → About page content
|
├── styles/
│   ├── About.module.css         → About Us page styling
│   ├── EndScreen.module.css     → Win/fail screens styling
│   ├── EscapeRoom.module.css    → Main gameplay styling
│   ├── Home.module.css          → Home page styling
│   ├── Layout.module.css        → Layout styling (header, footer, navigation bar)
│   └── globals.css              → Base styles
</pre>

---

## Routes

| Route            | Description                                                  |
|------------------|--------------------------------------------------------------|
| `/`              | Home screen lets the user pick an escape room theme          |
| `/room?theme=x`  | Escape room for the selected theme                           |
| `/about`         | About Us page                                                |
| `/win`           | Displayed when user escapes in time                          |
| `/fail`          | Displayed if timer runs out before all puzzles are solved    |

---

## Components

### `Layout.js`
- Provides a consistent header and footer
- Navigation bar with Home and About links

### `EscapeRoom.js`
- Main gameplay logic
- Fetches puzzles dynamically by theme
- Manages state for:
  - Current puzzle index
  - Feedback messages
  - Puzzle list
- Handles answer checking and result navigation

### `Puzzle.js`
- Handles the current puzzle’s input, hint system and submission
- Hint button:
  - Can be clicked up to 2 times
  - Shows a styled hint
- Input resets with each new puzzle

### `Timer.js`
- Countdown starts from 10 minutes
- Automatically redirects to `/fail` when time is up
- Uses `useEffect` for interval logic

### `ProgressBar.js`
- Displays current progress as a horizontal bar
- Updates as the user solves each puzzle

### `About.js`
- Styled component with sections describing the game, mission and features

---

## State Management Overview

| Component        | State                           | Purpose                                          |
|------------------|---------------------------------|-------------------------------------------------|
| `EscapeRoom.js`  | `puzzles`, `index`, `feedback`  | Controls puzzle list, current index and message  |
| `Puzzle.js`      | `userAnswer`, `clicks`, `shown` | Handles puzzle interaction and hint logic        |
| `Timer.js`       | `timeLeft`                      | Countdown logic for fail condition               |

---

## Logic Flow Summary

1. User selects a theme → navigates to `/room?theme=...`
2. `EscapeRoom.js` loads puzzles from `/data/[theme].json`
3. Puzzle renders with `Puzzle.js`, tracks answer/hint state
4. Timer counts down from 10 minutes
5. Correct answer:
   - Shows theme-specific feedback
   - Moves to next puzzle
   - Navigates to `/win` after last puzzle
6. Incorrect answer:
   - Displays theme-specific error message
7. Timeout:
   - Navigates to `/fail`

---