export function MathGraph() {
  return (
    <svg className="math-graph" viewBox="0 0 360 230" role="img" aria-label="三个一次函数的图像">
      <defs><pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M 24 0 L 0 0 0 24" className="grid-line" /></pattern></defs>
      <rect width="360" height="230" fill="url(#grid)" />
      <path className="axis" d="M28 178H338M166 16V212" />
      <path className="curve curve-blue" d="M72 204L270 38" />
      <path className="curve curve-green" d="M80 52L292 202" />
      <path className="curve curve-dash" d="M42 194L314 84" />
      <text x="322" y="169">x</text><text x="174" y="22">y</text>
      <text x="254" y="45">y = 2x + 1</text><text x="246" y="205">y = -x + 3</text>
    </svg>
  );
}
