// Main App Component


/**
 * App Content Component (Inside Providers)
 */
const AppContent = () => {
  const { settings, toggleSetting, updateSetting } = useSettingsContext();
  const { history, addResult, clearHistory } = useHistoryContext();

  // Initialize typing test
  const typingTest = useTypingTest(
    {
      testMode: 'time',
      timeLimit: 30,
      wordLimit: 10,
      textType: 'words',
      customText: ''
    },
    handleTestComplete
  );

  // Sound effects
  const sound = useSound(settings.sound);

  // Result modal state
  const [showResultModal, setShowResultModal] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);

  // Handle test completion
  function handleTestComplete(result) {
    setCurrentResult(result);
    setShowResultModal(true);
    addResult(result);
    sound.playComplete();
  }

  // Handle character input
  const handleCharacterInput = useCallback(
    (char) => {
      if (!typingTest.isTestActive) {
        typingTest.startTest();
        sound.playStart();
      }

      const expectedChar = typingTest.currentText[typingTest.currentPosition];
      typingTest.handleCharacterInput(char);

      if (char === expectedChar) {
        sound.playCorrect();
      } else {
        sound.playError();
      }
    },
    [typingTest, sound]
  );

  // Handle backspace
  const handleBackspace = useCallback(() => {
    typingTest.handleBackspace();
  }, [typingTest]);

  // Handle restart
  const handleRestart = useCallback(() => {
    typingTest.resetTest();
    setShowResultModal(false);
  }, [typingTest]);

  // Handle pause
  const handlePause = useCallback(() => {
    typingTest.pauseTest();
  }, [typingTest]);

  // Handle resume
  const handleResume = useCallback(() => {
    typingTest.resumeTest();
  }, [typingTest]);

  // Handle show history
  const handleShowHistory = () => {
    const historySection = document.getElementById('historySection');
    if (historySection) {
      historySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle share result
  const handleShareResult = async (result) => {
    const text = formatResultForSharing(result);
    const success = await navigator.clipboard.writeText(text);
    
    if (success) {
      alert(SUCCESS_MESSAGES.RESULT_COPIED);
    } else {
      alert('Failed to copy results');
    }
  };

  // Close result modal
  const handleCloseResultModal = () => {
    setShowResultModal(false);
  };

  // Handle test mode change
  const handleTestModeChange = (mode) => {
    typingTest.setTestMode(mode);
    typingTest.resetTest();
  };

  // Handle time limit change
  const handleTimeLimitChange = (time) => {
    typingTest.setTimeLimit(time);
    typingTest.resetTest();
  };

  // Handle word limit change
  const handleWordLimitChange = (words) => {
    typingTest.setWordLimit(words);
    typingTest.resetTest();
  };

  // Handle text type change
  const handleTextTypeChange = (type) => {
    typingTest.setTextType(type);
    if (type !== 'custom') {
      typingTest.resetTest();
    }
  };

  // Handle custom text change
  const handleCustomTextChange = (text) => {
    typingTest.setCustomText(text);
  };

  // Handle apply custom text
  const handleApplyCustomText = () => {
    typingTest.resetTest();
  };

  // Handle setting toggle
  const handleSettingToggle = (key) => {
    toggleSetting(key);
    
    // If toggling settings that affect text generation, restart test
    if (['punctuation', 'numbers', 'capitals'].includes(key)) {
      typingTest.resetTest();
    }
  };

  // Handle font size change
  const handleFontSizeChange = (size) => {
    updateSetting('fontSize', size);
  };

  // Handle font family change
  const handleFontFamilyChange = (family) => {
    updateSetting('fontFamily', family);
  };

  // Get current stats
  const currentStats = typingTest.getCurrentStats();

  return (
    <div className={styles.app}>
      {/* Navbar */}
      <Navbar onNewTest={handleRestart} onShowHistory={handleShowHistory} />

      {/* Main Container */}
      <div className={styles.container}>
        {/* Control Panel */}
        <ControlPanel
          testMode={typingTest.testMode}
          onTestModeChange={handleTestModeChange}
          timeLimit={typingTest.timeLimit}
          onTimeLimitChange={handleTimeLimitChange}
          wordLimit={typingTest.wordLimit}
          onWordLimitChange={handleWordLimitChange}
          textType={typingTest.textType}
          onTextTypeChange={handleTextTypeChange}
          customText={typingTest.customText}
          onCustomTextChange={handleCustomTextChange}
          onApplyCustomText={handleApplyCustomText}
          settings={settings}
          onSettingToggle={handleSettingToggle}
          onFontSizeChange={handleFontSizeChange}
          onFontFamilyChange={handleFontFamilyChange}
        />

        {/* Typing Area */}
        <TypingArea
          currentText={typingTest.currentText}
          currentPosition={typingTest.currentPosition}
          getCharStatus={typingTest.getCharStatus}
          stats={currentStats}
          isTestActive={typingTest.isTestActive}
          isPaused={typingTest.isPaused}
          onRestart={handleRestart}
          onPause={handlePause}
          onResume={handleResume}
          onCharacterInput={handleCharacterInput}
          onBackspace={handleBackspace}
          fontSize={settings.fontSize}
          fontFamily={settings.fontFamily}
        />

        {/* History Section */}
        <History history={history} onClearHistory={clearHistory} />

        {/* Performance Chart */}
        <PerformanceChart history={history} />
      </div>

      {/* Result Modal */}
      <ResultModal
        isOpen={showResultModal}
        result={currentResult}
        onClose={handleCloseResultModal}
        onNewTest={handleRestart}
        onShare={handleShareResult}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

/**
 * Main App Component with Providers
 */
const App = () => {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <HistoryProvider>
          <AppContent />
        </HistoryProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
};

export default App;