const getGroupBadge = ({ groupCount, group }) => {
  let maxCount = group.count;
  if (!group.count) maxCount = group.options.length;

  if (
    !group.mandatory &&
    (!groupCount[group.id] || groupCount[group.id] < maxCount)
  ) {
    return <span className='group-status'>Opcional</span>;
  }

  // if (!group.mandatory) {
  //   return <span className='group-status'>Opcional</span>;
  // }

  if (!groupCount[group.id] || groupCount[group.id] < maxCount) {
    return <span className='group-status mandatory'>Obligatorio</span>;
  }

  return <span className='group-status done'>Listo</span>;
};

export default getGroupBadge;
