const highlightMatch = ({ option, query }) => {
  const parts = option?.split(new RegExp(`(${query})`, 'gi'));

  return parts?.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={`highlited-match-${i}`} style={{ fontWeight: 'bold' }}>
        {part}
      </span>
    ) : (
      part
    )
  );
};

export default highlightMatch;
