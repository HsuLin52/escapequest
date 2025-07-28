export default function ProgressBar({ current, total }) {
  const percent = Math.floor((current / total) * 100);
  return (
    <div style={{ margin: '10px 0' }}>
      <p>Progress: {current} / {total}</p>
      <div style={{ background: '#eee', height: '10px' }}>
        <div style={{
          width: `${percent}%`,
          background: '#6a0dad',
          height: '10px'
        }} />
      </div>
    </div>
  );
}