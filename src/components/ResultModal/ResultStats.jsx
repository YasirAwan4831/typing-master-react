// Result Stats Component



/**
 * Result Stats Component
 * Displays detailed statistics in the result modal
 */
const ResultStats = ({ result }) => {
  const stats = [
    { label: 'WPM', value: result.wpm },
    { label: 'CPM', value: result.cpm },
    { label: 'Accuracy', value: `${result.accuracy}%` },
    { label: 'Mistakes', value: result.mistakes },
    { label: 'Time', value: `${result.timeInSeconds}s` },
    { label: 'Correct Chars', value: result.correctChars },
    { label: 'Wrong Chars', value: result.incorrectChars },
    { label: 'Backspaces', value: result.backspaceCount }
  ];

  return (
    <div className={styles.resultStats}>
      {stats.map((stat, index) => (
        <div key={index} className={styles.resultStat}>
          <span className={styles.resultStatValue}>{stat.value}</span>
          <span className={styles.resultStatLabel}>{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default ResultStats;