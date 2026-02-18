# Typing Master (React + Vite)

A modern typing practice application that helps users improve typing speed and accuracy with real-time feedback, performance charts, and session history.

## 🚀 Features
- Real-time typing test
- Speed (WPM) and accuracy calculation
- Performance charts
- Session history tracking
- Clean responsive UI
- Built with React + Vite

## 🛠️ Tech Stack
- React
- Vite
- JavaScript
- CSS

## 📦 Installation

```bash
git clone https://github.com/your-username/typing-master-react.git
cd typing-master-react
npm install
npm run dev
```

## 📁 Project Structure

```
typing-master/
├─ public/
│  ├─ favicon.jpeg
│  ├─ index.html
│  └─ manifest.json
├─ src/
│  ├─ components/
│  │  ├─ Chart/
│  │  │  ├─ index.js
│  │  │  ├─ PerformanceChart.jsx
│  │  │  └─ PerformanceChart.module.css
│  │  ├─ Common/
│  │  │  ├─ Button/
│  │  │  │  ├─ Button.jsx
│  │  │  │  ├─ Button.module.css
│  │  │  │  └─ index.js
│  │  │  ├─ Input/
│  │  │  │  ├─ index.js
│  │  │  │  ├─ Input.jsx
│  │  │  │  └─ Input.module.css
│  │  │  └─ ToggleSwitch/
│  │  │     ├─ index.js
│  │  │     ├─ ToggleSwitch.jsx
│  │  │     └─ ToggleSwitch.module.css
│  │  ├─ ControlPanel/
│  │  │  ├─ ControlPanel.jsx
│  │  │  ├─ ControlPanel.module.css
│  │  │  ├─ index.js
│  │  │  ├─ SettingsPanel.jsx
│  │  │  ├─ TestModeSelector.jsx
│  │  │  ├─ TextTypeSelector.jsx
│  │  │  └─ TypographySettings.jsx
│  │  ├─ Footer/
│  │  │  ├─ Footer.jsx
│  │  │  ├─ Footer.module.css
│  │  │  └─ index.js
│  │  ├─ History/
│  │  │  ├─ History.jsx
│  │  │  ├─ History.module.css
│  │  │  ├─ HistoryItem.jsx
│  │  │  ├─ HistoryList.jsx
│  │  │  └─ index.js
│  │  ├─ Navbar/
│  │  │  ├─ index.js
│  │  │  ├─ Navbar.jsx
│  │  │  └─ Navbar.module.css
│  │  ├─ ResultModal/
│  │  │  ├─ index.js
│  │  │  ├─ ResultModal.jsx
│  │  │  ├─ ResultModal.module.css
│  │  │  └─ ResultStats.jsx
│  │  └─ TypingArea/
│  │     ├─ ActionButtons.jsx
│  │     ├─ index.js
│  │     ├─ StatsBar.jsx
│  │     ├─ TextDisplay.jsx
│  │     ├─ TypingArea.jsx
│  │     └─ TypingArea.module.css
│  ├─ context/
│  │  ├─ HistoryContext.jsx
│  │  ├─ SettingsContext.jsx
│  │  └─ ThemeContext.jsx
│  ├─ data/
│  │  ├─ codeSnippets.js
│  │  ├─ paragraphs.js
│  │  ├─ sentences.js
│  │  └─ words.js
│  ├─ hooks/
│  │  ├─ useHistory.js
│  │  ├─ useLocalStorage.js
│  │  ├─ useSound.js
│  │  ├─ useTheme.js
│  │  ├─ useTimer.js
│  │  └─ useTypingTest.js
│  ├─ styles/
│  │  ├─ animations.css
│  │  ├─ global.css
│  │  └─ variables.css
│  ├─ utils/
│  │  ├─ constants.js
│  │  ├─ helpers.js
│  │  ├─ soundEffects.js
│  │  └─ textGenerator.js
│  ├─ App.jsx
│  ├─ App.module.css
│  ├─ index.css
│  └─ index.js
├─ .gitignore
├─ LICENSE
├─ package-lock.json
├─ package.json
├─ Project-Structure.md
└─ README.md
```
