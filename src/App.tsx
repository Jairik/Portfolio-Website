import Dither from './components/Dither';

function App() {
  return (
    <>
      <div>
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
          <Dither
            waveColor={[0.2, 1.0, 0.2]}
            disableAnimation={false}
            enableMouseInteraction={true}
            mouseRadius={0.1}
            colorNum={4}
            waveAmplitude={0.3}
            waveFrequency={10}
            waveSpeed={0.02}
          />
        </div>
      </div>
    </>
  );
}

export default App;
