export default function SectionBox({ title, children }) {
  return (
    <div className="section-box">
      <h2 className="section-title">{title}</h2>
      <div className="section-content-wrapper">{children}</div>
    </div>
  );
}
