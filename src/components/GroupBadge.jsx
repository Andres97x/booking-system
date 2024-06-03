const GroupBadge = ({ groupCount, group }) => {
  // groupCount refers to the current selected or added count.
  // group.count refers to the max count value specified for that specific group, if the group comes without an explicit group.count, then the max count will be the length of the group.
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

export default GroupBadge;
