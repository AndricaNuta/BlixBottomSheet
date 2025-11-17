# Blix Bottom Sheet Chat

A small React Native demo showcasing a chat UI embedded inside a bottom sheet.  
Users can open the sheet, send a message, see a “thinking…” state, and receive a simulated assistant reply with suggested follow-up messages.

---

## 🚀 Tech Stack

- **React Native 0.81 (CLI)**
- **TypeScript**
- **@gorhom/bottom-sheet**
- **react-native-gesture-handler**
---

## ✨ Features

- **Bottom sheet chat UI**
  - Snap points: `20%`, `60%`, `90%`
  - Expand/collapse gestures
  - Pan down to close

- **Pinned input field**
  - Input + Send button rendered inside `BottomSheetFooter`
  - Stays visible at all snap points
  - Respects safe area insets

- **Scrollable chat**
  - `BottomSheetFlatList` with a header (“Chat” + subtitle)
  - Automatically scrolls to the newest message — *only if the user is already at the bottom*

- **Simulated assistant**
  - User message appears instantly
  - Temporary “Thinking…” bubble while waiting
  - Assistant reply includes dynamic follow-up suggestions
  - Tapping a follow-up sends a new message automatically

---

<img width="380" height="794" alt="Screenshot 2025-11-17 at 21 05 13" src="https://github.com/user-attachments/assets/106a6239-19dc-4ea7-b90d-deef4a048109" />
<img width="385" height="821" alt="Screenshot 2025-11-17 at 21 05 48" src="https://github.com/user-attachments/assets/0b9e8da0-8ffe-49a9-9433-ea763e923453" />

## ▶️ Running the Project ( npm )

```bash
npm install
npm run ios       # for iOS simulator
npm run android   # for Android emulator
npm start         # metro bundler only

